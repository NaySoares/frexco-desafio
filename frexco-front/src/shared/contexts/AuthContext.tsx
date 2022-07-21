import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';

import { ClientService } from '../services/api/client/Client';
import { Api } from '../services/api/axiosConfig';

type TUser = {
  email: string;
  name: string;
  isAdmin: boolean;
};

type TUserAuthenticated = {
  token: string;
  refreshToken: string;
  name: string;
  isAdmin: boolean;
};

type TSignInCredentials = {
  email: string;
  password: string;
};

interface IAuthContextData {
  signIn: (credentials: TSignInCredentials) => Promise<void>;
  signOut: () => void;
  user: TUser | undefined;
  isAuthenticated: boolean;
}

type TAuthProviderProps = {
  children: ReactNode;
};

const win: Window = window;

export const AuthContext = createContext({} as IAuthContextData);

export function signOut() {
  destroyCookie(undefined, 'frexcoauth.token');
  destroyCookie(undefined, 'frexcoauth.refreshToken');

  win.location='/home';
}

export function AuthProvider({ children }: TAuthProviderProps) {
  const [user, setUser] = useState<TUser>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'frexcoauth.token': token } = parseCookies();

    if (token) {
      ClientService.getUser()
        .then((result) => {
          if ( result instanceof Error ) {
            return alert(result.message);
          } else {
            const { email, name, isAdmin } = result.user;
            setUser({ email, name, isAdmin });
          }
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }: TSignInCredentials) {
    try {

      let userAuthenticated: TUserAuthenticated = {
        token : '',
        refreshToken: '',
        name: '',
        isAdmin: false
      };
      
      await ClientService.getSession({
        email,
        password,
      })
        .then((result) => {
          if(result instanceof Error) {
            return alert(result.message);
          } else {
            userAuthenticated = {
              token: result.token,
              refreshToken: result.refreshToken,
              name: result.user.name,
              isAdmin: result.user.isAdmin
            };
            
            win.location='/home';
          }
        });

      setCookie(undefined, 'frexcoauth.token', userAuthenticated.token, {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });
      setCookie(undefined, 'frexcoauth.refreshToken', userAuthenticated.refreshToken, {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      setUser({
        email,
        name: userAuthenticated.name,
        isAdmin: userAuthenticated.isAdmin
      });

      Api.defaults.headers.common['Authorization'] = `Bearer ${userAuthenticated.token}`;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user }}>
      {children}
    </AuthContext.Provider>
  );
}
