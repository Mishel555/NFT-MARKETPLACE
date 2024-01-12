import { ExhibitionItem } from '@components/organisms';
import { IExhibition } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
  exhibitions: IExhibition[];
  hasNextPage: boolean;
  loadMore: () => void;
}

const Wrapper = ({
  exhibitions,
  hasNextPage,
  loadMore,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      {!!exhibitions.length ?
        exhibitions?.map((data, index) => (
          <ExhibitionItem key={index} data={data} />
        ))
        : <h1 className={styles.root__message}>Nothing to show....</h1>
      }
    </div>
    {hasNextPage && (
      <button onClick={loadMore} className={styles.root__more}>
        load more
      </button>
    )}
  </div>
);

export default Wrapper;
