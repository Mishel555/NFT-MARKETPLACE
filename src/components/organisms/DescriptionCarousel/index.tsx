import Slider from 'react-slick';
import classNames from 'classnames';

import SenseShape from '@assets/images/home/sense-shape.svg';
import GalleryShape from '@assets/images/home/gallery-curator-shape.svg';
import MultisensoryShape from '@assets/images/home/multisensory-shape.svg';

import './slider.css';
import styles from './style.module.scss';

const DATA = [
  {
    title: 'The first 5th sensory gallery',
    description: 'We combine innovative tech with high-end art to engage all your senses for an entirely immersive and exceptional experience for all 5 senses. ',
    image: SenseShape,
  },
  {
    title: 'Bridging physical and digital',
    description: 'Easily kick off events and stay connected with artists, galleries, and collectors all in one collaborative hub – both online and in real life.',
    image: GalleryShape,
  },
  {
    title: 'Exclusive memberships',
    description: 'Whether you’re a notable gallerist or seasoned collector, join our growing ecosystem of talented and recognized players within the Web3 Art Industry.',
    image: MultisensoryShape,
  },
];

const sliderSettings = {
  dots: true,
  speed: 500,
  arrows: false,
  autoplay: true,
  infinite: true,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  customPaging: () => <li />,
};

const DescriptionCarousel = () => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      {DATA.map(({
        image,
        title,
        description,
      }, index) => (
        <div key={index} className={styles.root__item}>
          <img src={image} alt="shape" className={styles.root__image} />
          <h1 className={styles.root__title}>{title}</h1>
          <p className={styles.root__description}>{description}</p>
        </div>
      ))}
    </div>
    <div className={classNames(styles.root__slider, 'description-slider-root')}>
      <Slider {...sliderSettings}>
        {DATA.map(({
          image,
          title,
          description,
        }, index) => (
          <div key={index} className={styles.root__item}>
            <img src={image} alt="shape" className={styles.root__image} />
            <h1 className={styles.root__title}>{title}</h1>
            <p className={styles.root__description}>{description}</p>
          </div>
        ))}
      </Slider>
    </div>
  </div>
);

export default DescriptionCarousel;
