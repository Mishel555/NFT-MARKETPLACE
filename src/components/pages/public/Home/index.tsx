import { Fragment, useEffect, useState } from 'react';
import moment from 'moment';
import { IBanner, IBannersResponse } from '@constants/types';
import Paths from '@constants/paths';
import api from '@services/api';
import { MainBanners } from '@components/organisms';
// import LaunchBanner from './LaunchBanner';

import IntroSection from './IntroSection';
import ArtsSection from './ArtsSection';
import RolesSection from './RolesSection';
import UsersSection from './UsersSection';

import styles from './style.modue.scss';

const Home = () => {
  const [banners, setBanners] = useState<IBanner[]>([]);

  useEffect(() => {
    let mounted = true;

    window.scrollTo(0, 0);
    const loadBanners = async () => {
      try {
        const { data } = await api.banners.getAll();
        const temp = data as IBannersResponse[];

        if (mounted) {
          setBanners(
            temp.map((banner) => ({
              _id: banner['_id'],
              __v: banner['__v'],
              image: banner.image,
              ...(banner.link && { url: banner.link }),
              ...(banner.buttonName && { buttonName: banner.buttonName }),
              ...(banner.title && {
                title: {
                  label: banner.title,
                  color: banner.titleColor,
                },
              }),
              ...(banner.descr && {
                description: {
                  label: banner.descr,
                  color: banner.descrColor,
                },
              }),
              ...(banner.endsAt && {
                countdown: {
                  color: banner.countdownColor,
                  endsAt: moment(banner.endsAt).toISOString(),
                },
              }),
            }))
          );
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadBanners();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fragment>
      <IntroSection />
      {/* <LaunchBanner /> */}
      {!!banners.length && <MainBanners banners={banners} className={styles.banner} />}
      <UsersSection role='gallery' labels='member galleries' link={Paths.GALLERIES} />
      <UsersSection role='artist' labels='featured artists' link={Paths.ARTISTS} />
      <ArtsSection />
      <RolesSection />
    </Fragment>
  );
};

export default Home;
