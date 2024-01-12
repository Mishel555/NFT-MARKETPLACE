import { LoginWithMetamask } from '@components/molecules';
import styles from './style.module.scss';

const SignIn = () => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>
      Sign in
    </h1>
    <LoginWithMetamask className={styles.root__metamask} />
  </div>
);

export default SignIn;
