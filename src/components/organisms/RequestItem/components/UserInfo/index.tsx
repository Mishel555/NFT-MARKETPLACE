import { Fragment, useMemo } from 'react';
import { IRequest, IUser } from '@constants/types';
import { getProfilePublicRoute } from '@utils';
import { ExternalLink, InternalLink, StatusBadge } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  user: IUser;
  requestInfo: IRequest;
}

const ArtistInfo = ({ user, requestInfo }: IProps) => {
  const {
    role,
    links,
    email,
    wallet,
    header,
    gallery,
    website,
    taxOffice,
    portfolio,
    description,
    name: {
      last,
      first,
    },
  } = useMemo(() => ({
    ...user,
    name: {
      first: user.name?.first ?? '',
      last: user.name?.last ?? '',
    },
  }), [user]);

  const {
    approvedByAdminAt,
    approvedByGalleryAt,
    acceptedOfferAt,
    rejectedByAdminAt,
    rejectedByGalleryAt,
    declinedOfferAt,
  } = useMemo(() => (requestInfo), [requestInfo]);

  return (
    <div className={styles.root}>
      <div className={styles.root__main}>
        <div className={styles.root__all}>
          <p className={styles.root__title}>
            User Info
          </p>
          <div className={styles.root__all}>
            {role.name === 'artist' && (
              <Fragment>
                <div className={styles.root__list}>
                  <p className={styles.root__label}>
                    First Name
                  </p>
                  <p className={styles.root__text}>
                    {first}
                  </p>
                </div>
                <div className={styles.root__list}>
                  <p className={styles.root__label}>
                    Last Name
                  </p>
                  <p className={styles.root__text}>
                    {last}
                  </p>
                </div>
              </Fragment>
            )}

            {role.name === 'gallery' && (
              <Fragment>
                <div className={styles.root__list}>
                  <p className={styles.root__label}>
                    Company header
                  </p>
                  <p className={styles.root__text}>
                    {header}
                  </p>
                </div>
                <div className={styles.root__list}>
                  <p className={styles.root__label}>
                    Address
                  </p>
                  <p className={styles.root__text}>
                    {taxOffice}
                  </p>
                </div>
                <div className={styles.root__list}>
                  <p className={styles.root__label}>
                    Description
                  </p>
                  <p className={styles.root__text}>
                    {description}
                  </p>
                </div>
              </Fragment>
            )}
            <div className={styles.root__list}>
              <p className={styles.root__label}>
                Email
              </p>
              <p className={styles.root__text}>
                {email}
              </p>
            </div>
            <div className={styles.root__list}>
              <p className={styles.root__label}>
                Wallet
              </p>
              <p className={styles.root__text}>
                {wallet}
              </p>
            </div>
            {role.name === 'artist' && (
              <Fragment>
                <div className={styles.root__list}>
                  <p className={styles.root__label}>
                    Gallery
                  </p>
                  {gallery && (
                    <p className={styles.root__text}>
                      <InternalLink to={getProfilePublicRoute(user.gallery['_id'], 'gallery')}>
                        {gallery?.header}
                      </InternalLink>
                    </p>
                  )}
                </div>
                <div className={styles.root__list}>
                  <p className={styles.root__label}>
                    Portfolio
                  </p>
                  <p className={styles.root__text}>
                    <ExternalLink to={portfolio}>
                      {portfolio}
                    </ExternalLink>
                  </p>
                </div>
              </Fragment>
            )}
            {!!links?.length && (
              <div className={styles.root__list}>
                <p className={styles.root__label}>
                  Social media links
                </p>
                <div>
                  {links.map((link, index) => (
                    <p key={index} className={styles.root__text}>
                      <ExternalLink to={link}>
                        {link}
                      </ExternalLink>
                    </p>
                  ))}
                </div>
              </div>
            )}
            {!!website && (
              <div className={styles.root__list}>
                <p className={styles.root__label}>
                  Own website link
                </p>
                <p className={styles.root__text}>
                  <ExternalLink to={website}>
                    {website}
                  </ExternalLink>
                </p>
              </div>
            )}
          </div>
        </div>
        <div className={styles.root__status}>
          <p className={styles.root__title}>
            Statuses history
          </p>
          <div className={styles.root__status__inner}>
            {!!approvedByAdminAt && (
              <StatusBadge type="approvedByAdminAt" date={approvedByAdminAt} />
            )}
            {!!rejectedByAdminAt && (
              <StatusBadge type="rejectedByAdminAt" date={rejectedByAdminAt} />
            )}
            {!!approvedByGalleryAt && (
              <StatusBadge type="approvedByGalleryAt" date={approvedByGalleryAt} />
            )}
            {!!rejectedByGalleryAt && (
              <StatusBadge type="rejectedByGalleryAt" date={rejectedByGalleryAt} />
            )}
            {!!acceptedOfferAt && (
              <StatusBadge type="acceptedOfferAt" date={acceptedOfferAt} />
            )}
            {!!declinedOfferAt && (
              <StatusBadge type="declinedOfferAt" date={declinedOfferAt} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistInfo;
