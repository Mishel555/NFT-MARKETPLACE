import { Fragment, useEffect, useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import { IRole, IUser, UserRoles } from '@constants/types';
import api from '@services/api';
import { MarketProfileCard } from '@components/molecules';
import { InternalLink } from '@components/atoms';

import './slider.css';
import styles from './style.module.scss';

interface IProps {
  role: UserRoles;
  labels: string;
  link: string;
}

const sliderSettings = (itemsCount: number) => ({
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: itemsCount > 4 ? 4 : itemsCount,
  slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: true,
  customPaging: () => <li />,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: itemsCount > 3 ? 3 : itemsCount,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: itemsCount > 2.5 ? 2.5 : itemsCount,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: itemsCount > 2 ? 2 : itemsCount,
      },
    },
    {
      breakpoint: 600,
      settings: {
        dots: true,
        slidesToShow: itemsCount > 1.5 ? 1.5 : itemsCount,
      },
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1,
      },
    },
  ],
});

const UsersSection = ({ role, labels, link }: IProps) => {
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    let mounted = true;

    const loadUsers = async () => {
      try {
        const temp: IUser[] = [];
        const { data: { users } } = await api.users.getAll({
          sort: '-createdAt',
          role: role,
          approved: true,
          perPage: 10,
        });

        users.forEach((artist: { role: IRole }) => {
          const { role } = artist;

          temp.push({
            ...artist as unknown as IUser,
            role: role,
          });
        });

        if (mounted) {
          setUsers(temp);
        }
      } catch (e) {
        console.log(e);
      }
    };

    loadUsers();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <Fragment>
      {!!users.length && (
        <section className={styles.root}>
          <div className={styles.root__wrapper}>
            <h1 className={styles.root__title}>
              {labels}
            </h1>
            <InternalLink to={link} className={styles.root__viewAll}>view all</InternalLink>
          </div>
          <div className={classNames(styles.root__slider, 'users-slider-root')}>
            <Slider {...sliderSettings(users.length)}>
              {users.map((user, index) => (
                <MarketProfileCard key={index} user={user} />
              ))}
            </Slider>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default UsersSection;
