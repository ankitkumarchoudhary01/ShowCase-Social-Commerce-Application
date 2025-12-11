import { useEffect, useState } from 'react';

function PageWrapper({ children }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Trigger the animation on mount
    setShow(true);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-in-out transform ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
      }`}
    >
      {children}
    </div>
  );
}

export default PageWrapper;
