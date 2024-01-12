import { useEffect } from 'react';

const Help = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>Help</h1>
    </div>
  );
};

export default Help;
