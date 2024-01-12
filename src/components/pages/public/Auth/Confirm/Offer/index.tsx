import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { useAuth } from '@hooks';
import api from '@services/api';
import PATHS from '@constants/paths';
import { AIS_EMAIL } from '@constants/contacts';
import { FeePaige } from '@components/molecules';
import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

const Offer = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth();

  const request = useMemo(() => (user?.requests[user?.requests.length - 1]), [user]);

  const accept = async () => {
    try {
      if (request) {
        await api.requests.approve(request._id);
        const { data } = await api.users.getMe();
        setUser(data);

        navigate(`/profile/${data['_id']}`);
      }

    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  };

  const decline = () => {
    navigate(`${PATHS.CONFIRM}?redirect=true&type=declineOffer`);
  };

  useEffect(() => {
    if (!user) {
      navigate('/signIn', { replace: true });
      return;
    }

    if (request) {
      if (request.acceptedOfferAt) {
        return navigate(`/profile/${user['_id']}`, { replace: true });
      }

      if (request.declinedOfferAt) {
        return navigate(`${PATHS.CONFIRM}?redirect=true&type=declinedOffer`, { replace: true });
      }
    }
  }, [user]);

  return (
    <div className={styles.root}>
      <div className={styles.root__header}>
        <h1 className={styles.root__header_title}>
          Offer page
        </h1>
        <h2 className={styles.root__header_subTitle}>
          Almost ready! <br />
          Please confirm the Offer from Gallery
        </h2>
      </div>
      <div className={styles.root__info}>
        <div className={styles.root__info}>
          <div className={styles.root__info__privacy_wrapper}>
            <h1 className={styles.root__info__privacy_wrapper_first_title}>
              Privacy Policy of artinspace.art
            </h1>
            <h1 className={styles.root__info__privacy_wrapper_second_title}>
              This Application collects some Personal Data from its Users.
            </h1>
            <p className={styles.root__info__privacy_wrapper_description}>
              Users may be subject to different protection standards and broader standards may therefore
              apply to some.
              In
              order to learn more about the protection criteria, Users can refer to the applicability
              section.
              This document can be printed for reference by using the print command in the settings of any
              browser.
            </p>
          </div>
          <div className={styles.root__info__owner_wrapper}>
            <h1 className={styles.root__info__owner_wrapper_title}>
              Owner and Data Controller
            </h1>
            <ul>
              <li>ART IN SPACE FZCO</li>
              <li>DSO- Dubai Digital Park</li>
              <li>Dubai Silicon Oasis</li>
              <li>Owner contact email: {AIS_EMAIL}</li>
            </ul>
            <p className={styles.offer_text}>Gallery Offer:</p>
            {!!request?.fee && (
              <FeePaige fee={request.fee} isMultipleOpened />
            )}
            <p className={styles.offer_text}>
              <InternalLink to="/terms">
                Terms and conditions
              </InternalLink>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.root__buttons}>
        <button onClick={accept}>
          Agree
        </button>
        <button onClick={decline}>
          Decline
        </button>
      </div>
    </div>
  );
};

export default Offer;
