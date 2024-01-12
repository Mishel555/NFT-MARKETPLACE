import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IProfileArtType } from '@constants/types';
import { getBlockchainCurrency } from '@utils';
import { useWeb3 } from '@hooks';
import api from '@services/api';
import { InternalLink } from '@components/atoms';

import BlackEthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  userId: string;
}

const LIMIT = 10;
const Auctions = ({ userId }: IProps) => {
  const { send } = useWeb3();
  const navigate = useNavigate();

  const id = useMemo(() => userId, [userId]);

  const [arts, setArts] = useState<IProfileArtType[] | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const close = async (index: number) => {
    try {
      if (!arts) return;

      const art = arts[index];

      if (!art.auction || !art.blockchain) {
        return toast.error('You can not close this auction');
      }

      let winner: string | null = null;
      const lastBid = art.auction?.bids.length ? art.auction.bids[art.auction.bids.length - 1] : null;
      const foundedCopy = art?.copies ? art.copies[0] : null;

      if (!foundedCopy) {
        return toast.error('You can not close this auction');
      }

      if (lastBid) {
        const { data } = await api.users.getOne(lastBid.user);
        winner = data.wallet;
      }

      let contractTX = '';
      if (winner) {
        const result = await send('auctionEnd', {
          close: false,
          tokenId: foundedCopy.nftId,
          blockchain: art.blockchain,
        });

        contractTX = result.transactionHash;
      } else {
        const result = await send('auctionEndBySeller', {
          close: true,
          tokenId: foundedCopy.nftId,
          blockchain: art.blockchain,
        });

        contractTX = result.transactionHash;
      }

      await api.art.closeAuction(art['_id'], { contractTX });

      toast.success('Auction successfully closed');
      setArts(arts.filter(item => item['_id'] !== art['_id']));
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);

      toast.error(error.response?.data.message || error.message || e);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  const loadMore = () => setCurrentPage(prevState => prevState + 1);

  useEffect(() => {
    let mounted = true;

    const getData = async () => {
      const { data } = await api.users.getUserArt(id, {
        ended: true,
        auction: true,
        perPage: LIMIT,
        page: currentPage,
      });

      if (mounted) {
        setHasNextPage(data.hasNextPage);
        setArts(prevState => prevState ? [...prevState, ...data.arts] : data.arts);
      }
    };

    getData();

    return () => {
      mounted = false;
    };
  }, [id, currentPage]);

  return arts?.length ? (
    <div className={styles.root}>
      <div className={styles.root__table}>
        <div className={styles.root__head}>
          <p className={styles.root__label}>Auction</p>
          <p className={styles.root__label}>Bid (ETH/MATIC)</p>
          <p className={styles.root__label}>Action</p>
        </div>
        {arts.map(({
          _id,
          title,
          blockchain,
          auction,
        }, index) => (
          <div key={_id} className={styles.root__item}>
            <InternalLink to={`/art/${_id}`} className={styles.root__title}>
              {index}. {title}
            </InternalLink>
            <p className={styles.root__title}>
              {blockchain === 'ethereum' ? (
                <img src={BlackEthIcon} alt="crypto" />
              ) : (
                <img src={PolygonIcon} alt="crypto" />
              )}
              {!!auction?.bids && !!blockchain && (
                `${auction.bids[auction.bids.length - 1]?.price || 0} ${getBlockchainCurrency(blockchain)}`
              )}
            </p>
            <button onClick={() => close(index)} className={styles.root__item_action}>
              Close
            </button>
          </div>
        ))}
      </div>
      {hasNextPage && (
        <button onClick={loadMore} className={styles.root__more}>
          Load More
        </button>
      )}
    </div>
  ) : null;
};

export default Auctions;
