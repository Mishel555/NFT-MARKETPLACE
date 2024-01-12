import { ReactNode } from 'react';
import { Header, Footer } from '@components/main';
import styles from './style.module.scss';

interface IProps {
  children: ReactNode;
}

const MarketTemplate = ({ children }: IProps) => (
  <main className={styles.main}>
    <Header />
    <div className={styles.root}>
      {children}
    </div>
    <Footer />
  </main>
);

export default MarketTemplate;
