import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import styles from './style.module.scss';

interface IRoles {
  name: string;
  title: string;
  description: string;
  button: string;
  type: string;
}

const ROLES: IRoles[] = [
  {
    name: 'Collector',
    title: 'Find more masterpieces',
    description: 'Browse and build your finest collection of the world’s most immersive and cutting\-edge digital art of the century.',
    button: 'Start exploring',
    type: 'user',
  },
  {
    name: 'Gallery',
    title: 'Interconnected spaces',
    description: 'Access infinite talent and manage entire exhibitions both digitally and in physical event spaces around the globe. ',
    button: 'Uncover possibilities',
    type: 'gallery',
  },
  {
    name: 'Artist',
    title: 'Unlock your reach',
    description:
      'Join our thriving marketplace to create and showcase your multi-sensory art in front of a global, growing audience digitally and in select galleries.',
    button: 'Showcase your art',
    type: 'artist',
  },
];

const RolesSection = () => {
  const navigate = useNavigate();
  const redirectToRole = useCallback((to: string) => navigate(to), [navigate]);

  return (
    <section className={styles.root}>
      <div className={styles.root__main}>
        <div className={styles.root__info}>
          <h1 className={styles.root__title}>
            revolutionizing the art industry
          </h1>
          <h2 className={styles.root__subtitle}>
            Fusing our unique technology to allow the world to fully experience art with all 5 senses.
          </h2>
        </div>
        <div className={styles.root__block}>
          {ROLES.map(({
            name,
            title,
            description,
            button,
            type,
          }, index) => (
            <div key={index} className={classNames(styles.root__item, styles[`root__item_${name.toLowerCase()}`])}>
              <div className={styles.root__item__inner}>
                <p className={styles.root__item__label}>
                  {name}
                </p>
                <p className={styles.root__item__title}>
                  {title}
                </p>
                <p className={styles.root__item__text}>
                  {description}
                </p>
                <button
                  onClick={() => redirectToRole(`/signUp/info?role=${type}`)}
                  className={styles.root__item__btn}
                >
                  {button}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
