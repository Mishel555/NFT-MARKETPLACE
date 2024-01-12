import { Fragment, useEffect, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { useAccount } from 'wagmi';
import moment from 'moment';
import classNames from 'classnames';
import { ProfileRoutes } from '@constants/routes';
import { ILinkedTabs, IUser } from '@constants/types';
import { getShortAddress } from '@utils';
import { UserBadge, SocialBadge, StatisticItem, GalleryBadge, MembershipBadge } from '@components/atoms';
import { WhiteFeePaige, ProfileMetamask } from '@components/molecules';
import ProfileTabs from '../ProfileTabs';

import EthIcon from '@assets/icons/eth-icon.svg';
import styles from './style.module.scss';

interface IProps {
  user: IUser;
  path: 'public' | 'private';
}

const ProfileCard = ({
  user,
  path,
}: IProps) => {
  const { address } = useAccount();
  const { pathname } = useLocation();
  const currentPath = pathname.slice(-(pathname.length - pathname.lastIndexOf('/'))).replace('/', '');
  const purePath = (currentPath === user['_id'] || currentPath === 'me' || currentPath === '') ? '' : currentPath;
  const routes = useMemo(() => (ProfileRoutes(user)), [user]);
  const TABS = useMemo(() => {
    const tabs: ILinkedTabs[] = [];

    routes[path][user?.role.name ?? 'user'].forEach(({
      path,
      tabTitle,
    }) => {
      if (tabTitle) {
        tabs.push({
          to: path,
          label: tabTitle,
        });
      }
    });

    return tabs;
  }, [path, routes, user]);

  const {
    header,
    login,
    wallet,
    taxOffice,
    links,
    website,
    portfolio,
    role,
    description,
    gallery,
    bio,
    email,
    artworks,
    artists,
    myLikes,
    fee,
    createdAt,
    hasStandardMembership,
    hasPlatinumMembership,
  } = user;

  const activeTabRef = useRef<HTMLAnchorElement | null>(null);

  const shortAddress = useMemo(() => {
    if (path === 'public') {
      if (wallet) {
        return getShortAddress(wallet);
      }

      return '';
    }

    if (address) {
      return getShortAddress(address);
    }

    if (wallet) {
      return getShortAddress(wallet);
    }

    return '';
  }, [path, address, wallet]);

  useEffect(() => {
    if (!activeTabRef.current) {
      return;
    }

    activeTabRef.current.scrollIntoView({
      behavior: 'smooth',
      inline: 'end',
    });
  }, [purePath]);

  return (
    <div className={styles.root}>
      <div className={classNames(styles.root__group, styles.root__gallery_group)}>
        <div className={styles.root__paige}>
          <p className={styles.root__name}>
            {header ?? login}
          </p>
          {hasPlatinumMembership && (
            <MembershipBadge type={hasPlatinumMembership ? 'Platinum Membership' : 'Standard Membership'} />
          )}

          {!hasPlatinumMembership && hasStandardMembership && (
            <MembershipBadge type="Standard Membership" />
          )}
        </div>
      </div>
      <div className={styles.root__menu}>
        {/* visible in mobile */}
        <ProfileTabs ref={activeTabRef} tabs={TABS} current={purePath} />
      </div>
      {(isMobile && purePath !== '') ? null : (
        <Fragment>
          <div className={classNames(styles.root__group, styles.root__group_metamask)}>
            <div className={styles.root__group__main}>
              <UserBadge role={user.role.name} />
              <p className={styles.root__eth}>
                <img src={EthIcon} alt="" />
                {shortAddress}
              </p>
            </div>
          </div>
          {path !== 'public' && (
            <div className={classNames(styles.root__group, styles.root__group_profileMetamask)}>
              <ProfileMetamask />
            </div>
          )}
          {(!!email && path !== 'public') && (
            <div className={styles.root__group}>
              <p className={classNames(styles.root__text, styles.root__text_bold)}>
                {email}
              </p>
            </div>
          )}
          {(!!description || !!bio) && (
            <div className={styles.root__group}>
              <p className={styles.root__text}>
                {description || bio}
              </p>
            </div>
          )}
          <div className={styles.root__group}>
            <div className={styles.root__statistics}>
              {(() => {
                switch (role.name) {
                  case 'user':
                    return (
                      <Fragment>
                        <StatisticItem name="Artworks" value={artworks} />
                        <StatisticItem name="Favorites" value={myLikes} />
                      </Fragment>
                    );
                  case 'gallery':
                    return (
                      <Fragment>
                        <StatisticItem name="Artworks" value={artworks} />
                        <StatisticItem name="Artists" value={artists} />
                      </Fragment>
                    );
                  case 'artist':
                    return (
                      <Fragment>
                        <StatisticItem name="Artworks" value={artworks} />
                        <StatisticItem name="Favorites" value={myLikes} />
                      </Fragment>
                    );
                  case 'admin':
                    return (
                      <Fragment>
                        <StatisticItem name="Artworks" value={artworks} />
                        <StatisticItem name="Favorites" value={myLikes} />
                      </Fragment>
                    );
                }
              })()}
            </div>
          </div>
          {(portfolio || website || !!links?.length) && (
            <div className={styles.root__group}>
              {!!portfolio && (
                <SocialBadge url={portfolio} title="Portfolio" />
              )}
              {!!website && (
                <SocialBadge url={website} title={website} />
              )}
              {links?.map((link, index) => (
                <SocialBadge key={index} url={link} title={link} />
              ))}
            </div>
          )}
          {taxOffice && (
            <div className={styles.root__group}>
              <div className={styles.root__tax}>
                <p className={styles.root__tax__text}>
                  Address
                </p>
                <p className={styles.root__tax__number}>
                  {taxOffice}
                </p>
              </div>
            </div>
          )}
          <div className={styles.root__group}>
            {!!gallery && (
              <div className={styles.root__tax}>
                <p className={styles.root__tax__text}>
                  Curated By
                </p>
                <GalleryBadge gallery={gallery} />
              </div>
            )}
          </div>
          {path !== 'public' && role.name === 'artist' && (
            <div className={classNames(styles.root__group, styles.root__group_start)}>
              <div className={styles.root__wrap}>
                <p className={styles.root__tax__text}>
                  Start date:
                </p>
                <p className={styles.root__date}>
                  {moment(createdAt).format('DD/MM/YYYY')}
                </p>
              </div>
            </div>
          )}
          {(path !== 'public') && role.name === 'artist' && (
            <div className={classNames(styles.root__group, styles.root__group_fee)}>
              <WhiteFeePaige fee={fee} />
            </div>
          )}
        </Fragment>
      )}
    </div>
  );
};

export default ProfileCard;
