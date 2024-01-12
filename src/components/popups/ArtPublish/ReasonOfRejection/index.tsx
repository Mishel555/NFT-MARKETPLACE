import styles from './style.module.scss';

interface IProps {
  message: string;
}

const ReasonOfRejection = ({ message }: IProps) => {
  const isAdmin = message.match('Rejected by admin. Reason:');
  const cleanMessage = message.replace(`Rejected by ${isAdmin ? 'admin' : 'gallery'}. Reason: `, '');

  return (
    <div className={styles.root}>
      <h3 className={styles.root__title}>
        {isAdmin ? 'Admin rejected reason' : 'Gallery rejected reason'}
      </h3>
      <p className={styles.root__content}>{cleanMessage}</p>
    </div>
  );
};


export default ReasonOfRejection;
