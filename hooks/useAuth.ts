import { useLayoutEffect, useState } from 'react';

const TOKEN_KEY = 'auth_token';

export const useAuth = () => {
  const [token, setTokenState] = useState<string | null>(null);

  const setToken = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenState(null);
  };

  const isAuthenticated = !!token;

  useLayoutEffect(() => {
    const setToken = (token: string) => {
      setTokenState(token);
    };
    if (typeof window !== 'undefined' && !token) {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        setToken(token);
      }
    }
  }, []);

  return { token, setToken, clearToken, isAuthenticated };
};
