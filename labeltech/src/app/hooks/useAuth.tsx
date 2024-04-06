import { decode } from '../../../public/utils/jwtUtils';
import { useEffect } from 'react';

const useAuth = () => {
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
    }
    if (token) {
      const parsedToken = decode(token);
      if (parsedToken.role === 'Leader' && window.location.pathname !== '/line_leader') {
        window.location.href = '/line_leader';
      }
      //regex to match the admin /admin/* routes
      const adminRoute = /^\/admin\/.*/;
      if (parsedToken.role === 'Admin' && !adminRoute.test(window.location.pathname)) {
        window.location.href = '/admin';
      }
    }
  }, []);
};

export { useAuth };
