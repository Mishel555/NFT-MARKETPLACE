import CloudIcon from '@assets/icons/cloud-empty-violet.svg';
import styles from './style.module.scss';

interface IProps {
  dataName?: string;
}

const EmptyMessage = ({ dataName }: IProps) => (
  <div className={styles.root}>
    <img src={CloudIcon} alt="empty" className={styles.root__img} />
    <h1 className={styles.root__message}>
      No data {!!dataName && `"${dataName}"`} to show yet.
    </h1>
  </div>
);

export default EmptyMessage;
