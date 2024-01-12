import PlusIcon from '@assets/icons/plus-black-round-icon.svg';
import styles from './style.module.scss';

interface IProps {
  disabled: boolean;
  add: (id: string) => void;
}

const Toolbar = ({ disabled, add }: IProps) => (
  <div className={styles.root}>
    <button onClick={() => add('ais')} type="button" disabled={disabled} className={styles.root__button}>
      <img src={PlusIcon} alt="icon" />
      Add Collaborators
    </button>
  </div>
);

export default Toolbar;
