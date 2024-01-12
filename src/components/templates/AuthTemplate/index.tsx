import { ReactNode, useEffect } from 'react';
import HeroSection from './HeroSection';
import FormSection from './FormSection';
import MobileSection from './MobileSection';

import styles from './style.module.scss';

interface IProps {
  children?: ReactNode;
}

const AuthTemplate = ({ children }: IProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.root}>
      <MobileSection />
      <FormSection>
        {children}
      </FormSection>
      <HeroSection />
    </div>
  );
};

export default AuthTemplate;
