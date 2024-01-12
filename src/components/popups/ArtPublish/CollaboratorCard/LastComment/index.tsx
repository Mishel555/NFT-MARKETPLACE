import styles from './style.module.scss';

interface IProps {
  comment: string;
  reject?: boolean;
}

const LastComment = ({ comment, reject }: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>{reject ? 'Reason' : 'Last comment'}</h2>
    <p className={styles.root__text}>
      {comment}
    </p>
  </div>
);

export default LastComment;
