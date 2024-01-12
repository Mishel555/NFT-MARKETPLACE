import styles from './style.module.scss';

interface IAction {
  label: string;
  onClick?: () => void;
  submit?: boolean;
}

interface IProps {
  actions: IAction[];
}

const FormActions = ({ actions }: IProps) => (
  <div className={styles.root}>
    {actions.map(({ label, submit, onClick }, index) => (
      <button
        key={index}
        onClick={onClick}
        type={submit ? 'submit' : 'button'}
        className={submit ? styles.root__submit : styles.root__cancel}
      >
        {label}
      </button>
    ))}
  </div>
);

export default FormActions;
