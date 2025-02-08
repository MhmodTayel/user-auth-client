import { PropsWithChildren, createContext, useEffect, useState } from 'react';
import { User } from '../types';
import TokenService from '../utils/helpers.ts';

export const AuthContext = createContext<{
  accessToken: string;
  user: User | null;
  setaccessToken: (token: string | undefined) => void;
  setUser: (user: User | null) => void;
  loading: boolean;
  logout: () => void;
} | null>(null);

const AuthContextWrapper: React.FC<PropsWithChildren> = ({ children }) => {
  const [token, setToken] = useState<string>('');
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const accessToken = TokenService.getToken();
    if (accessToken) setToken(accessToken);
    const user = localStorage.getItem('user');
    if (user) setUser(JSON.parse(user));
     setLoading(false);
  }, []);

  const logout = () => {
    TokenService.removeToken();
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        accessToken: token,
        setaccessToken: (token) => {
          TokenService.saveToken(token || '');
          setToken(token || '');
        },
        user,
        setUser: (user) => {
          localStorage.setItem('user', JSON.stringify(user));
          setUser(user);
        },
        loading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
