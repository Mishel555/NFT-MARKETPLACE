import { Fragment, ReactNode } from 'react';
import { SettingsSidebar } from '@components/organisms';
import { Footer, Header } from '@components/main';
import styles from './style.module.scss';

interface IProps {
  children: ReactNode;
}

const SettingsTemplate = ({ children }: IProps) => (
  <Fragment>
    <Header />
    <div className={styles.root}>
      <SettingsSidebar />
      {children}
    </div>
    <Footer />
  </Fragment>
);

export default SettingsTemplate;
