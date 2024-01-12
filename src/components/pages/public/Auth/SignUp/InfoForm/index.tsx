import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FieldValues } from 'react-hook-form';
import Header from '../Header';
import Basic from './Basic';
import Gallery from './Gallery';
import Artist from './Artist';

import styles from './style.module.scss';

interface IProps {
  role: string;
  confirm: (values: FieldValues) => void;
}

const InfoForm = ({ role, confirm }: IProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!role) {
      navigate('/signUp');
    }
  }, [role]);

  return (
    <div className={styles.root}>
      <div className={styles.content_root_main}>
        <div className={styles.content_root}>
          <Header
            currentStep={3}
            stepLength={role === 'artist' ? 4 : 3}
            stepTitle="Fill account information"
          />
          {(() => {
            switch (role) {
              case 'user':
                return <Basic confirm={confirm} />;
              case 'gallery':
                return <Gallery confirm={confirm} />;
              case 'artist':
                return <Artist confirm={confirm} />;
            }
          })()}
        </div>
      </div>
    </div>
  );
};

export default InfoForm;
