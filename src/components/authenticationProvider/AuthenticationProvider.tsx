import { createContext, useState, ReactNode, useEffect } from 'react';
import { ErrorResponse } from '../../services/apiService';
import authService from '../../services/auth';

interface AuthContextType {
  user: Object | null;
  isLoggedIn: boolean;
  logout: () => void;
  login: (token: string, refreshToken: string) => void;
  isSessionExpired: (response: ErrorResponse) => boolean;
  handleSessionExpired: (response: ErrorResponse) => void;
}

interface Props {
    children: ReactNode;
}

export const UserContext = createContext<AuthContextType | null>(null);

function AuthenticationProvider({ children }: Props) {
    const [user, setUser] = useState<Object | null>(null);

    const isSessionExpired = (response : ErrorResponse) => response.status === 401;

    const handleSessionExpired = async (response: ErrorResponse) => {
        if (isSessionExpired(response)) {
          await authService.renewToken();
        }
    };

  const isLoggedIn = !!user;

  const logout = () => {
    authService.removeCookies();
    setUser(null);
  };

  const login = (token: string, refreshToken: string): void => {
    authService.setCookies(token, refreshToken);
    const currentUser = authService.getUser();
    setUser(currentUser);
  };

  useEffect(() => {
    const currentUserId = authService.getUser();
    setUser(currentUserId);
  }, [])

  return (
    <UserContext.Provider value={{
        user,
        isLoggedIn,
        logout,
        isSessionExpired,
        handleSessionExpired,
        login,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default AuthenticationProvider;