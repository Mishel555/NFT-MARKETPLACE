import GlobusBlack from '@assets/icons/Globus.png';
import GlobusWhite from '@assets/icons/Globus-white.png';
import styles from './style.module.scss';

interface props {
  fill?: 'black' | 'white';
}

const MainLogo = ({ fill = 'black' }: props) => {
  if (fill === 'black') {
    return <img alt="" src={GlobusBlack} className={styles.root} />;
  }

  return <img alt="" src={GlobusWhite} className={styles.root} />;
};

export default MainLogo;
