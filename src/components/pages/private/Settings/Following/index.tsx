import { useEffect } from 'react';

const Following = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>Following</h1>
    </div>
  );
};

export default Following;
