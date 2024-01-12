import CopyIcon from '@assets/icons/copy-black-icon.svg';
import styles from './style.module.scss';

interface IProps {
  count?: number;
}

const CopyBadge = ({ count = 0 }: IProps) => (
  <div className={styles.root}>
    <img src={CopyIcon} alt="copy" />
    <span>{count}X</span>
  </div>
);

export default CopyBadge;
