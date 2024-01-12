import { useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArtType } from '@constants/types';
import { CirclePlay } from '@components/icons';

import styles from './style.module.scss';

interface IProps {
  id: string;
  preview: string;
  isHovered: boolean;
  type: ArtType;
}

const Hero = ({
  id,
  preview,
  isHovered,
  type,
}: IProps) => {
  const navigate = useNavigate();
  const {
    artId,
    artImage,
    nftType,
  } = useMemo(() => ({
    artId: id,
    artImage: preview,
    nftType: type,
  }), [id, preview, type]);

  const redirectToSingle = useCallback((): void => {
    navigate(`/art/${artId}`);
  }, [artId, navigate]);

  return (
    <div className={styles.root}>
      <img
        alt="art"
        src={artImage}
        className={styles.root__image}
      />
      <div onClick={redirectToSingle} className={styles.root__wrapper}>
        {isHovered && nftType === 'video' && (
          <button className={styles.root__wrapper_btn}>
            <CirclePlay />
          </button>
        )}
      </div>
    </div>
  );
};

export default Hero;
