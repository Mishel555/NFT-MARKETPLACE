import { useEffect, useState } from 'react';
import { usePopup } from '@hooks';
import { IActuationType } from '@constants/types';
import api from '@services/api';
import { VideoPlayer } from '@components/organisms';

import CloseIcon from '@assets/icons/close-icon-white.svg';
import styles from './style.module.scss';

interface IProps {
  id: string;
  src: string;
}

const ArtPreview = ({ id, src }: IProps) => {
  const popupManager = usePopup();

  const [actuations, setActuations] = useState<IActuationType[] | null>(null);

  const close = () => {
    popupManager.close();
  };

  useEffect(() => {
    let mounted = true;

    const fetchData = async () => {
      const { data } = await api.art.getSingle(id);
      const { actuations } = data;

      if (mounted && actuations.length) {
        setActuations(actuations);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className={styles.popup__video}>
      <div className={styles.popup__video_block}>
        <button className={styles.popup__video_close} onClick={close}>
          <img src={CloseIcon} alt="" />
        </button>
        <div className={styles.popup__video_wrap}>
          <VideoPlayer
            id={id}
            src={src}
            actuations={actuations ?? []}
            actuationType="back"
            allowOutSRC
          />
        </div>
      </div>
    </div>
  );
};

export default ArtPreview;
