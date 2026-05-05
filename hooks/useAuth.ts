import { useLayoutEffect, useState } from 'react';

const TOKEN_KEY = 'auth_token';

export const useAuth = () => {
  const [token, setTokenState] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  });

  const setToken = (newToken: string) => {
    localStorage.setItem(TOKEN_KEY, newToken);
    setTokenState(newToken);
  };

  const clearToken = () => {
    localStorage.removeItem(TOKEN_KEY);
    setTokenState(null);
  };

  useLayoutEffect(() => {
    const setToken = (token: string) => {
      setTokenState(token);
    };
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem(TOKEN_KEY);
      if (token) {
        setToken(token);
      }
    }
  }, []);

  const isAuthenticated = !!token;

  return { token, setToken, clearToken, isAuthenticated };
};
