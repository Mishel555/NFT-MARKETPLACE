import { useSearchParams } from 'react-router-dom';
import loadable from '@loadable/component';
import styles from './style.module.scss';

// const SuccessAlert = loadable(() => import('./SuccessAlert'));
const WaitAdmin = loadable(() => import('./WaitAdmin'));
const WaitGallery = loadable(() => import('./WaitGallery'));
const GallerySuccess = loadable(() => import('./GallerySuccess'));
const ArtistSuccess = loadable(() => import('./ArtistSuccess'));
const Offer = loadable(() => import('./Offer'));
const DeclineOffer = loadable(() => import('./DeclineOffer'));
const DeclinedOffer = loadable(() => import('./DeclinedOffer'));

const Confirm = () => {
  const [searchParams] = useSearchParams();

  const type = searchParams.get('type');

  return (
    <div className={styles.root}>
      {(() => {
        switch (type) {
          case 'waitAdmin':
            return <WaitAdmin />;
          case 'waitGallery':
            return <WaitGallery />;
          case 'gallerySuccess':
            return <GallerySuccess />;
          case 'artistSuccess' :
            return <ArtistSuccess />;
          case 'declineOffer':
            return <DeclineOffer />;
          case 'declinedOffer':
            return <DeclinedOffer />;
          case 'offer':
            return <Offer />;
          default:
            return 'Something went wrong, please reload the page'; // <SuccessAlert />
        }
      })()}
    </div>
  );
};

export default Confirm;
