import { useCallback, useEffect } from 'react';
import { usePopup } from '@hooks';

import FragranceEffect from '@assets/icons/fragrance-icon.svg';
import WindEffect from '@assets/icons/wind-icon.svg';
import FogEffect from '@assets/icons/fog-icon.svg';
import VibrationEffect from '@assets/icons/vibration-icon.svg';
import LightEffect from '@assets/icons/lights-black-icon.svg';
import styles from './style.module.scss';

const IMAGES: { [key: string]: string } = {
  fragrances: FragranceEffect,
  wind: WindEffect,
  fog: FogEffect,
  vibration: VibrationEffect,
  rgbtop: LightEffect,
  rgbbottom: LightEffect,
  frontr: LightEffect,
  frontl: LightEffect,
  backr: LightEffect,
  backl: LightEffect,
};

interface IProps {
  effect: string;
}

const EffectCard = ({ effect }: IProps) => {
  const popup = usePopup();

  const preview = useCallback(() => {
    popup.setData({ type: effect });
    popup.open('effect_preview');
  }, [effect, popup]);

  useEffect(() => popup.close()
    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
    , []);

  return (
    <div className={styles.root}>
      <img src={IMAGES[effect.toLowerCase().replaceAll(' ', '')]} className={styles.root__icon} alt="" />
      <p className={styles.root__name}>
        {effect}
      </p>

      <button onClick={preview} className={styles.root__preview}>
        Play
      </button>
    </div>
  );
};


export default EffectCard;
