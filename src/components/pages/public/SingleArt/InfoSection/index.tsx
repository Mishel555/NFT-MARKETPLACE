import { useMemo } from 'react';
import { IProfileArtType } from '@constants/types';
import Toolbar from '../Toolbar';
import TopSection from '../TopSection';
import EffectsSection from '../EffectsSection';
import DetailsSection from '../DetailsSection';
import EmotionsSection from '../EmotionsSection';

import styles from './style.module.scss';

interface IProps {
  art: IProfileArtType;
}

const InfoSection = ({ art }: IProps) => {
  const {
    _id,
    info,
    type,
    liked,
    likes,
    copies,
    status,
    effects,
    isImage,
    emotions,
  } = useMemo(() => ({
    ...art,
    effects: art.actuations?.map(({ devices }) =>
      devices.map(({ name }) => name)
    ).flat(1).filter((item, index, data) => data.indexOf(item) === index),
    info: {
      ...art.info,
      blockchain: art.blockchain,
      contractTx: art.history[0]?.tx,
    },
  }), [art]);

  return (
    <div className={styles.root}>
      <Toolbar id={_id} isLiked={liked} likeCount={likes} />
      <TopSection art={art} />
      {!!effects.length && (
        <EffectsSection availableEffects={effects} />
      )}
      <div className={styles.root_description}>
        <DetailsSection
          status={status}
          info={info}
          type={type}
          nftType={isImage ? 'image' : 'video'}
          tokenId={copies?.length && copies[0].nftId}
        />
        <EmotionsSection emotions={emotions} />
      </div>
    </div>
  );
};

export default InfoSection;
