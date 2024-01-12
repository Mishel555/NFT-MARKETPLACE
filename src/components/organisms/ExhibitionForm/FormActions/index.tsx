import styles from './style.module.scss';

interface IProps {
  id: string;
  cancel: (id: string) => void;
}

const FormActions = ({
  id,
  cancel,
}: IProps) => (
  <div className={styles.root}>
    <button type="submit" className={styles.root__save}>
      Save
    </button>
    <button type="button" onClick={() => cancel(id)} className={styles.root__cancel}>
      Cancel
    </button>
  </div>
);

export default FormActions;
