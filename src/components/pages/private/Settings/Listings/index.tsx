import { useEffect } from 'react';

const Listings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <h1>Listings</h1>
    </div>
  );
};

export default Listings;
