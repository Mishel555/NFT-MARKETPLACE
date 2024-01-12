import { useEffect } from 'react';

const Favorites = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
    </div>
  );
};

export default Favorites;
