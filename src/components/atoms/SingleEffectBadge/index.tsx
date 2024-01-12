import styles from './style.module.scss';

interface IProps {
  effect: string;
}

const SingleEffectPaige = ({ effect }: IProps) => (
  <div className={styles.root}>
    {effect}
  </div>
);

export default SingleEffectPaige;
