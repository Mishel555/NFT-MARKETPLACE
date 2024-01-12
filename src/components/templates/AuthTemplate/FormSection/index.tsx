import { ReactNode } from 'react';
import styles from './style.module.scss';

interface IPropTypes {
  children?: ReactNode;
}

const FormSection = ({ children }: IPropTypes) => (
  <section className={styles.root}>
    <div className={styles.content_root}>
      {children}
    </div>
  </section>
);

export default FormSection;
