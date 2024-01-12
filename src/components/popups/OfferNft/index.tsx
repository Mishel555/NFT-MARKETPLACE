import { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAccount } from 'wagmi';
import { AxiosError } from 'axios';
import { useAuth, useWeb3, usePopup } from '@hooks';
import { IOfferNftProps, IProfileArtType } from '@constants/types';
import { ZERO_ADDRESS } from '@constants/web3';
import { getWithoutNDecimal } from '@utils';
import api from '@services/api';
import Heading from './Heading';
import Item from './Item';
import Info from './Info';
import Form from './Form';

import Loading from './Loading';
import styles from './style.module.scss';

const OfferNft = ({ artId, cb }: IOfferNftProps) => {
  const { address } = useAccount();

  const { send } = useWeb3();
  const { close } = usePopup();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [art, setArt] = useState<IProfileArtType | null>(null);
  const [balance, setBalance] = useState<number>(0);

  const tokenId = art?.copies?.filter(copy => copy.nftId)[0].nftId;

  const minBid = art && getWithoutNDecimal(art.price + art.price * 20 / 100, 6);

  const bid = async (amount: number) => {
    try {
      if (!user || !art?.auction || !balance || !minBid || !tokenId) return;

      setLoading(true);

      const lastBid = [...art.auction.bids].pop();
      const lastBidderIsMe = lastBid?.user === user['_id'];

      if (balance < amount) {
        setLoading(false);
        return toast.error('insufficient balance');
      }

      if (balance < minBid) {
        setLoading(false);
        return toast.error(`The minimum required deposit is ${minBid}`);
      }

      const blockchain = art.blockchain || 'ethereum';

      await send('auctionBidFromBalance', {
        tokenId,
        blockchain,
        amount: lastBidderIsMe ? amount - lastBid.price : amount,
      });

      const { data } = await api.art.bid(artId, { price: amount });

      if (cb) {
        cb(data);
      }

      setLoading(false);

      close();
    } catch (e) {
      const error = e as AxiosError;

      setLoading(false);
      console.log(e);

      toast.error(`${error.response?.data.message}`);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    if (!user) return;
    if (!address && !user.wallet) return;

    const getData = async () => {
      try {
        setLoading(true);

        const { data } = await api.art.getSingle(artId);
        const art = data as IProfileArtType;

        if (art.blockchain && mounted) {
          const balance = await send('balanceGet', {
            blockchain: art.blockchain,
            address: address || user.wallet || ZERO_ADDRESS,
          });

          setArt(data);
          setBalance(balance[art.blockchain]);
        }
      } catch (e) {
        const error = e as AxiosError;
        console.log(e);

        toast.error(error.response?.data.message || error.message || e);
      } finally {
        setLoading(false);
      }
    };

    getData();

    return () => {
      mounted = false;
    };
  }, [artId, user, address, send]);

  return (
    <div className={styles.root}>
      <div className={styles.root__main}>
        <Heading close={close} />
        {art && (
          <Fragment>
            <Item
              title={art.title}
              image={art.image}
              owner={art.artist}
              blockchain={art.blockchain ?? 'ethereum'}
            />
            {art.auction && (
              <Fragment>
                <Info
                  blockchain={art.blockchain ?? 'ethereum'}
                  price={art.price || art.auction.prices.start || 0}
                  balance={balance}
                />
                <Form
                  artId={art['_id']}
                  price={art.price || art.auction.prices.start || 0}
                  maxPrice={art.auction.prices.buyNow}
                  blockchain={art.blockchain ?? 'ethereum'}
                  tokenId={tokenId}
                  disabled={!balance || art.auction.prices.start > balance || art.price > balance}
                  bid={bid}
                  cb={cb}
                />
              </Fragment>
            )}
          </Fragment>
        )}
      </div>
      {loading && (
        <Loading />
      )}
    </div>
  );
};

export default OfferNft;
