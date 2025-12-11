import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export const useScrollRestoration = () => {
  const location = useLocation();
  const key = `scroll-position:${location.pathname}`;

  // Restore scroll on mount
  useEffect(() => {
    const y = sessionStorage.getItem(key);
    if (y) {
      window.scrollTo(0, parseInt(y, 10));
    }
  }, [key]);

  // Save scroll before route change or reload
  useEffect(() => {
    const save = () => {
      sessionStorage.setItem(key, window.scrollY);
    };

    window.addEventListener('beforeunload', save);
    return () => {
      save();
      window.removeEventListener('beforeunload', save);
    };
  }, [key]);
};
