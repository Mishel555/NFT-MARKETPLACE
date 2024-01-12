import { Fragment, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWindowSize } from '@hooks';

import Desktop from './Desktop';
import Mobile from './Mobile';
import NetworkNotification from './NetworkNotification';


const MarketHeader = () => {
  const navigate = useNavigate();
  const { width } = useWindowSize();

  const redirectToHome = (): void => navigate('/');
  const redirectToSignIn = (): void => navigate('/signIn');
  const redirectToSignUp = (): void => navigate('/signUp');

  return (
    <Fragment>
      {width && width > 768 ? (
        <Desktop
          redirectToSignIn={redirectToSignIn}
          redirectToSingUp={redirectToSignUp}
        />
      ) : (
        <Mobile
          redirectToHome={redirectToHome}
          redirectToSignIn={redirectToSignIn}
          redirectToSignUp={redirectToSignUp}
        />
      )}
      <NetworkNotification />
    </Fragment>
  );
};

export default memo(MarketHeader);
