import { Fragment, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import classNames from 'classnames';
import { IFee, IRequest, IUser, RequestStatusType } from '@constants/types';
import api from '@services/api';
import { useAuth } from '@hooks';
import { StatusBadge } from '@components/atoms';
import { FeePaige, ProfileAvatar } from '@components/molecules';
import UserInfo from './components/UserInfo';
import Actions from './components/Actions';

import RightIcon from '@assets/icons/right-small-icon.svg';
import styles from './style.module.scss';

interface IProps {
  requestInfo: IRequest;
  defaultFilter?: RequestStatusType;
  load: () => Promise<void>;
}

const RequestItem = ({ requestInfo, defaultFilter, load }: IProps) => {
  const { user: loggedUser } = useAuth();
  const navigate = useNavigate();
  const {
    _id,
    fee,
    artist,
    reason,
    gallery,
    approvedByAdminAt,
    approvedByGalleryAt,
    acceptedOfferAt,
    rejectedByAdminAt,
    rejectedByGalleryAt,
    declinedOfferAt,
  } = useMemo(() => (requestInfo), [requestInfo]);
  const user: IUser = useMemo(() => {
    const user = artist || gallery;

    return {
      ...user,
      gallery,
    };
  }, [artist, gallery]);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggle = (): void => setIsOpen(!isOpen);

  const reject = async (reason: string) => {
    try {
      await api.requests.reject(_id, reason);
      await load();
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  };

  const approve = async (fee?: IFee) => {
    try {
      await api.requests.approve(_id, fee);
      await load();
      setIsOpen(false);
    } catch (e) {
      const error = e as AxiosError;

      if (error.response?.status === 401) {
        navigate('/signIn');
      }

      console.log(e);
    }
  };

  return (
    <div className={styles.root}>
      {!!user && (
        <div className={styles.root_item}>
          <div className={styles.root_item__user}>
            <ProfileAvatar user={user} size="md" />
          </div>
          <p className={styles.root_item__username}>
            @{user.header ?? user.login}
          </p>
          <p className={styles.root_item__text}>
            {user.role.name}
          </p>
          <div className={styles.root_item__status}>
            <StatusBadge
              type={
                defaultFilter ? defaultFilter :
                  declinedOfferAt ? 'declinedOfferAt' :
                    rejectedByGalleryAt ? 'rejectedByGalleryAt' :
                      rejectedByAdminAt ? 'rejectedByAdminAt' :
                        acceptedOfferAt ? 'acceptedOfferAt' :
                          approvedByGalleryAt ? 'approvedByGalleryAt' :
                            approvedByAdminAt ? 'approvedByAdminAt' : 'inReviewByAdmin'
              }
            />
          </div>
          <button
            onClick={toggle}
            className={classNames(styles.root_item__btn, isOpen && styles.root_item__btn_active)}
          >
            VIEW
            <img src={RightIcon} alt="" />
          </button>
        </div>
      )}
      {!!user && isOpen && (
        <div>
          <UserInfo user={user} requestInfo={requestInfo} />
          {(approvedByGalleryAt || acceptedOfferAt || rejectedByAdminAt || rejectedByGalleryAt || declinedOfferAt) && (
            <Fragment>
              {!!fee.percents.length && (
                <div className={styles.root__fee}>
                  <FeePaige fee={fee} />
                </div>
              )}
              {!!reason && (
                <div className={styles.root__reason}>
                  <span className={styles.root__reason__title}>
                    Cause of rejection
                  </span>
                  <span className={styles.root__reason__description}>
                    {reason}
                  </span>
                </div>
              )}
            </Fragment>
          )}

          {loggedUser?.role.name === 'admin' && !approvedByAdminAt && !rejectedByAdminAt && (
            <Actions approve={approve} reject={reject} byAdmin />
          )}

          {loggedUser?.role.name === 'gallery' && approvedByAdminAt && !approvedByGalleryAt && !rejectedByGalleryAt && (
            <Actions approve={approve} reject={reject} />
          )}
        </div>
      )}
    </div>
  );
};

export default RequestItem;
