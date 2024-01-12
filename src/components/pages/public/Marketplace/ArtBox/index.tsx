import { useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Oval, Bars } from 'react-loading-icons';
import classNames from 'classnames';
import { IMarketArt } from '@constants/types';
import { MarketCard } from '@components/molecules';
import SortTool from '../SortTool';

import styles from './style.module.scss';

interface IProps {
  arts: IMarketArt[];
  loaded: boolean;
  hasMore: boolean;
  isUsd?: boolean;
  loadMore: () => void;
  setOption: (name: string, options: string | null) => void;
}

const ArtBox = ({
  arts,
  loaded,
  hasMore,
  isUsd,
  loadMore,
  setOption,
}: IProps) => {
  const {
    ref,
    inView,
  } = useInView();

  useEffect(() => {
    if (inView) {
      loadMore();
    }
  }, [inView]);

  return (
    <div className={classNames(styles.root, !loaded && styles.root_loading)}>
      {loaded ?
        arts.length ? (
          <div className={styles.root__wrapper}>
            <div className={styles.root__wrapper__sort}>
              <SortTool setOption={setOption} />
            </div>
            <div className={styles.root__wrapper__main}>
              {arts.map((art, index) => (
                <MarketCard key={index} art={art} isUsd={isUsd} />
              ))}
            </div>
          </div>
        ) : <h1 className={styles.root__message}>Nothing to show...</h1>
        : (
          <div className={styles.root__loader}>
            <Oval height="3em" stroke="#504a48" />
          </div>
        )}
      {hasMore && loaded && (
        <div className={styles.root__moreLoader} ref={ref}>
          <Bars height="3em" fill="black" />
        </div>
      )}
    </div>
  );
};

export default ArtBox;
