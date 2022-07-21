import axios from 'axios';
import { parseCookies } from 'nookies';
import { errorInterceptor, responseInterceptor } from './interceptors';

const setupAPI = ( ctx = undefined ) => {
  const cookies = parseCookies(ctx);
  
  const Api = axios.create({
    baseURL: 'http://localhost:3340',
    headers: {
      Authorization: `Bearer ${cookies['frexcoauth.token']}`,
    },
  });

  Api.interceptors.response.use(
    (response) => responseInterceptor(response),
    (error) => errorInterceptor(error, ctx)
  );

  Api.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    const token = `Bearer ${cookies['frexcoauth.token']}`;
    config.headers.Authorization = token;

    return config;
  });

  return Api;
};

export const Api = setupAPI();