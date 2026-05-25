'use client';
import { useState } from 'react';

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.cookie
      .split(';')
      .some((c) => c.trim() === 'auth_session=1');
  });

  const setToken = () => setIsAuthenticated(true);

  const clearToken = () => {
    setIsAuthenticated(false);
    fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
  };

  return { isAuthenticated, setToken, clearToken };
};
