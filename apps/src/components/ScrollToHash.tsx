import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToHash = () => {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.replace('#', '');
      // DOM이 렌더링된 후 스크롤하기 위해 약간 지연
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [hash, pathname]);

  return null;
};

export default ScrollToHash;
