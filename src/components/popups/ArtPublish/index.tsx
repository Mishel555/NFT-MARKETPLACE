import { useEffect, useMemo, useRef, useState } from 'react';
import { IArtPublishProps, IStep, ArtStatusType } from '@constants/types';
import { getArtStep } from '@utils';
import { useAuth } from '@hooks';
import { Steps } from '@components/molecules';

import Heading from './Heading';
import Types from './Types';
import Preview from './Preview';
import FixedForm from './FixedForm';
import AuctionForm from './AuctionForm';
import Loading from './Loading';

import styles from './style.module.scss';

const PUBLISHED_STATUS: ArtStatusType[] = ['published', 'closed', 'sold out', 'owned'];

const ArtPublish = ({ art, resell, loadFn, cb }: IArtPublishProps) => {
  const { user } = useAuth();

  const rootRef = useRef<HTMLDivElement | null>(null);

  const { title, auction, artist, isImage, status, preview, copies } = useMemo(() => ({
    ...art,
    effects: art.actuations?.map(({ devices }) =>
      devices.map(({ name }) => name))
      .flat(1).filter((item, index, data) => data.indexOf(item) === index),
  }), [art]);

  const [sellType, setSellType] = useState<string>('fixed');
  const [isMinting, setIsMinting] = useState<boolean>(false);

  const maxQuantity = copies && user &&
  copies.filter(copy => copy.seller !== user['_id'] && copy.owner === user['_id']).length || resell ? 0 : 10000;

  const setLoading = (value: boolean) => setIsMinting(value);

  const changeType = (type: string) => setSellType(type);

  const scrollTop = () => {
    if (!rootRef.current) return;
    rootRef.current.scrollTop = 0;
  };

  const stepData: IStep[] = [
    { label: 'Draft', status: getArtStep(art, 'Draft') },
    { label: 'Collaboration', status: getArtStep(art, 'Collaboration') },
    { label: 'Gallery', status: getArtStep(art, 'Gallery') },
    { label: 'Admin', status: getArtStep(art, 'Admin') },
    { label: 'Published', status: PUBLISHED_STATUS.includes(status) ? 'done' : 'pending' },
  ];

  useEffect(() => {
    if (copies && copies.length > 1) return setSellType('fixed');

    if (auction?.prices) {
      setSellType('auction');
    } else {
      setSellType('fixed');
    }
  }, [auction, copies]);

  return (
    <div className={styles.root}>
      {user && (
        <div ref={rootRef} className={styles.root__main}>
          <Heading />

          <Preview title={title} creator={artist} src={preview} type={isImage ? 'image' : 'video'} />

          <Steps data={stepData} />

          <Types
            type={sellType}
            disabled={(status !== 'processed' && !resell) || (copies && copies.length > 1)}
            isAdmin={user.role.name === 'admin'}
            changeType={changeType}
          />

          {sellType === 'fixed' && copies && (
            <FixedForm
              cb={cb}
              art={art}
              artCopies={copies}
              defaultBlockchain={art.blockchain || 'ethereum'}
              resell={resell}
              minQuantity={1}
              maxQuantity={maxQuantity}
              loadFn={loadFn}
              scrollTop={scrollTop}
              setLoading={setLoading}
            />
          )}

          {sellType === 'auction' && copies && (
            <AuctionForm
              cb={cb}
              art={art}
              copies={copies}
              defaultBlockchain={art.blockchain || 'ethereum'}
              resell={resell}
              loadFn={loadFn}
              scrollTop={scrollTop}
              setLoading={setLoading}
            />
          )}

          {sellType === 'membership' && copies && (
            <FixedForm
              cb={cb}
              art={art}
              isMembership
              artCopies={copies}
              defaultBlockchain={art.blockchain || 'ethereum'}
              resell={resell || !!copies?.length}
              minQuantity={1}
              maxQuantity={maxQuantity}
              scrollTop={scrollTop}
              setLoading={setLoading}
            />
          )}
        </div>
      )}
      {isMinting && <Loading />}
    </div>
  );
};

export default ArtPublish;
