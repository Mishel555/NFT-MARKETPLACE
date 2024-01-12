import styles from './style.module.scss';

interface IProps {
  stepTitle: string;
  currentStep: number;
  stepLength: number;
}

const Header = ({ stepTitle, currentStep, stepLength }: IProps) => (
  <div className={styles.header}>
    <h1 className={styles.header__title}>
      Create an account
    </h1>
    <h2 className={styles.header__subtitle}>
      {currentStep}/{stepLength} {stepTitle}
    </h2>
  </div>
);

export default Header;
