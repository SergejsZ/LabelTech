import { useEffect } from 'react';

const useAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
  }, []);
};

export { useAuth };
