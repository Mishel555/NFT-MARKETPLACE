import { devicePreviewSources } from '@constants/devices';
import { usePopup } from '@hooks';
import { CloseIcon } from '@components/icons';

import styles from './style.module.scss';

const VIDEOS: { [key: string]: string } = {
  'Fragrances': devicePreviewSources.Fragrances,
  'Front R': devicePreviewSources.FrontR,
  'Back R': devicePreviewSources.BackR,
  'Fog': devicePreviewSources.Fog,
  'RGBTop': devicePreviewSources.RGBTop,
  'Front L': devicePreviewSources.FrontL,
  'RGBBottom': devicePreviewSources.RGBBottom,
  'Wind': devicePreviewSources.Wind,
  'Back L': devicePreviewSources.BackL,
};

interface IProps {
  type: string;
}

const EffectPreview = ({ type }: IProps) => {
  const { close } = usePopup();

  return (
    <div className={styles.root}>
      <div className={styles.root__wrapper}>
        <video
          preload="metadata"
          muted
          autoPlay
          loop
          className={styles.root__wrapper_video}
        >
          <source src={VIDEOS[type]} />
          Your browser does not support html5 video tag.
        </video>
        <button onClick={close} className={styles.root__close}>
          <CloseIcon fill="#000" width={25} height={25} />
        </button>
      </div>
    </div>
  );
};

export default EffectPreview;
