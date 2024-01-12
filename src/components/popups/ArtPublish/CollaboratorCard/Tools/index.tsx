import ToolActions from '../ToolActions';
import styles from './style.module.scss';

interface IProps {
  readonly?: boolean;
  disableClose?: boolean;
  edit: () => void;
  close: () => void;
}

const Tools = ({ readonly, edit, disableClose, close }: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>Details</h2>
    <div className={styles.root__wrapper}>
      <ToolActions readonly={readonly} editDetails={edit} disableClose={disableClose} hideDetails={close} />
    </div>
  </div>
);

export default Tools;
