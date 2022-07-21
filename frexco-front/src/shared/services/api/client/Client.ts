import { Api } from '../axiosConfig';

export interface IDataClient {
  id: string,
  name: string,
  email: string,
  password: string,
}

export interface IDataStartSession {
  email: string;
  name: string;
  password: string;
}

export interface IDataSession {
  token: string;
  refreshToken: string;
  user: {
    email: string;
    name: string;
    isAdmin: boolean;
  }
}

const create = async (dataClient: Omit<IDataClient, 'id'>): Promise<void | Error> => {
  try {
    
    await Api.post('/users', dataClient);
    
  } catch (error) {
    console.error(error);
    
    return new Error((error as { message: string }).message || 'Error ao criar usuário!');
  }
};

const getSession = async (dataSession: Omit<IDataStartSession, 'name'> ): Promise<IDataSession | Error> => {
  try {
    const { data } = await Api.post('/sessions', dataSession );

    if (data.token) {
      return data;
    }

    return new Error('Error ao iniciar sessão!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao iniciar sessão!');
  }
};

const getUser = async (): Promise<IDataSession | Error> => {
  try {
    const { data } = await Api.get('/users/me');

    if (data.token) {
      return data;
    }

    return new Error('Error ao recuperar registro!');
  } catch (error) {
    console.error(error);

    return new Error((error as { message: string }).message || 'Error ao recuperar registro!');
  }
};

export const ClientService = {
  getSession,
  getUser,
  create
};