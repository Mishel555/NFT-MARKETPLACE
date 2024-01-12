import Slider from 'react-slick';
import classNames from 'classnames';
import { EffectCard } from '@components/molecules';

import './slider.css';
import styles from './style.module.scss';

interface IProps {
  availableEffects: string[];
}

const sliderSettings = (itemsCount: number) => ({
  infinite: true,
  speed: 500,
  arrows: false,
  autoplay: true,
  slidesToShow: itemsCount > 3.5 ? 4 : itemsCount,
  slidesToScroll: 1,
  swipeToSlide: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: itemsCount > 2.5 ? 3 : itemsCount,
      },
    },
    {
      breakpoint: 485,
      settings: {
        slidesToShow: itemsCount > 1 ? 2 : itemsCount,
      },
    },
  ],
});

const EffectsSection = ({ availableEffects }: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>
      INCORPORATED SENSES AND EFFECTS
    </h2>
    <div className={classNames(styles.root__slider, 'effects_slider')}>
      <Slider {...sliderSettings(availableEffects.length)}>
        {availableEffects.map((effect, id) => (
          <EffectCard key={id} effect={effect} />
        ))}
      </Slider>
    </div>
  </div>
);

export default EffectsSection;
