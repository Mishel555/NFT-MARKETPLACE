import { Fragment, ReactNode } from 'react';
import { Header, Footer } from '@components/main';
import styles from './style.module.scss';

interface IProps {
  children: ReactNode;
}

const BlankTemplate = ({ children }: IProps) => (
  <Fragment>
    <Header />
    <div className={styles.root}>
      {children}
    </div>
    <Footer />
  </Fragment>
);

export default BlankTemplate;
