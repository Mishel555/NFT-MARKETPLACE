import styles from './style.module.scss';

interface IProps {
  value: string;
  onChange: (newValue: string) => void;
}

const RejectArea = ({ value, onChange }: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>Reason</h1>
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={styles.root__area}
    />
  </div>
);

export default RejectArea;
