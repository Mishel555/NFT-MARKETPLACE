import { useState } from 'react';
import classNames from 'classnames';
import { ArtType } from '@constants/types';

import VideoIcon from '@assets/icons/video-file-black-icon.svg';
import ImageIcon from '@assets/icons/image-file-black-icon.svg';
import styles from './style.module.scss';

const TYPES: { name: ArtType; image: string }[] = [
  {
    name: 'video',
    image: VideoIcon,
  },
  {
    name: 'image',
    image: ImageIcon,
  },
];

interface IProps {
  defaultType: ArtType;
  select: (type: ArtType) => void;
}

const TypeStep = ({
  defaultType,
  select,
}: IProps) => {
  const [type, setType] = useState<number>(TYPES.findIndex(({ name }) => name === defaultType));

  const onClick = (index: number) => {
    select(TYPES[index].name);
    setType(index);
  };

  return (
    <div className={styles.root}>
      {TYPES.map(({
        name,
        image,
      }, index) => (
        <button
          key={index}
          type="button"
          onClick={() => onClick(index)}
          className={classNames(styles.root__item, index === type && styles.root__item_active)}
        >
          <img src={image} alt="type" className={styles.root__item_img} />
          <span className={styles.root__item_text}>{name}</span>
        </button>
      ))}
    </div>
  );
};

export default TypeStep;
