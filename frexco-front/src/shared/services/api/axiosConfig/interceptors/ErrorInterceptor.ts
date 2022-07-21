import { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { Api } from '..';
import { signOut } from '../../../../contexts/AuthContext';

const win: Window = window;

type TAxiosErrorProps = AxiosError & {
  response: {
    data: {
      code: string
    },
  };
}

let isRefresh = false;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let failedRequestQueue: any[] = [];

export const errorInterceptor = (error: TAxiosErrorProps, ctx = undefined) => {
  let cookies = parseCookies(ctx);
  
  if (error.message === 'Network Error') {
    return Promise.reject(new Error('Erro de conexão.'));
  }

  if (error.response.status === 400) {
    return Promise.reject(new Error('Senha ou e-mail incorreto!'));
  }
  
  if (error.response?.status === 401) {
    if (error.response.data?.code === 'token.expired') {
      cookies = parseCookies(ctx);

      const { 'frexcoauth.refreshToken': refreshToken } = cookies;
      const orignalConfig = error.config;

      if (!isRefresh) {
        isRefresh = true;

        Api.post('/refresh', {
          refreshToken
        })
          .then((result) => {
            const { token } = result.data;

            setCookie(ctx, 'frexcoauth.token', token, {
              maxAge: 60 * 60 * 24, // 1 day
              path: '/',
            });

            setCookie(ctx, 'frexcoauth.refreshToken', result.data.refreshToken, {
              maxAge: 60 * 60 * 24, // 1 day
              path: '/',
            }
            );

            Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

            failedRequestQueue.forEach(request => request.resolve(token));
            failedRequestQueue = [];
          }).catch((err) => {
            failedRequestQueue.forEach(request => request.reject(err));
            failedRequestQueue = [];
            
            signOut();
          }).finally(() => {
            isRefresh = false;
          });
      }

      return new Promise((resolve, reject) => {
        failedRequestQueue.push({
          resolve: (token: string) => {
            orignalConfig.headers = orignalConfig.headers ?? {};
            orignalConfig.headers['Authorization'] = `Bearer ${token}`;
            
            resolve(Api(orignalConfig));
          },
          reject: (err: AxiosError) => {
            reject(err);
          }
        });
      });
    } else {
      if (typeof win === 'undefined') {
        signOut();
      } else {
        return Promise.reject(new Error('Error with authentication token.'));
      }
    }
  } 

  if (error.response.status === 404) {
    return Promise.reject(new Error('Operação não realizada'));
  }
  
  return Promise.reject(error);
};
