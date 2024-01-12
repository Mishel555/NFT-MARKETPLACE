import { useMemo } from 'react';
import { IProfileArtType, MembershipType } from '@constants/types';
import Toolbar from '../Toolbar';
import TopSection from '../TopSection';

import styles from './style.module.scss';

interface IProps {
  art: IProfileArtType;
}

const InfoSection = ({ art }: IProps) => {
  const {
    _id,
    info,
    type,
    title,
    price,
    liked,
    likes,
    artist,
    copies,
    users,
    status,
    history,
    description,
    copiesForSale,
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
      <TopSection
        id={_id}
        price={price}
        title={title}
        description={description}
        history={history}
        creator={artist}
        status={status}
        blockchain={info.blockchain}
        users={users}
        copies={copies}
        copiesForSale={copiesForSale}
        type={type.name as MembershipType}
      />
    </div>
  );
};

export default InfoSection;
