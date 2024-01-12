import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IBuyArt, IProfileArtType } from '@constants/types';
import { useAuth, useWeb3, usePopup } from '@hooks';
import api from '@services/api';
import { CloseIcon } from '@components/icons';
import Loading from './Loading';
import Heading from './Heading';
import Controls from './Controls';
import Copy from './Copy';

import EthIcon from '@assets/icons/black-eth-icon.svg';
// import CardIcon from '@assets/icons/credit-card-black.svg';
import styles from './style.module.scss';

const AVAILABLE_METHODS = [
  {
    label: 'Crypto',
    img: EthIcon,
  },
  // {
  //   label: 'Credit or debit card',
  //   img: CardIcon,
  // },
];

const BuyNow = ({ id, cb }: IBuyArt) => {
  const { send } = useWeb3();
  const { user } = useAuth();
  const { close } = usePopup();
  const navigate = useNavigate();

  const [art, setArt] = useState<IProfileArtType | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<string>(AVAILABLE_METHODS[0].label);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [contractLoading, setContractLoading] = useState<boolean>(false);

  const changePayment = (index: number) => {
    setPaymentMethod(AVAILABLE_METHODS[index].label);
  };

  const confirm = async () => {
    try {
      if (!user || !art) return;

      if (!art.copies || !art.copies[0] || !art.auction) {
        return toast.error('Not available copies for buy');
      }

      setContractLoading(true);

      const { nftId, seller } = art.copies[0];
      const sellerWallet = art.users[seller].wallet;

      const price = art.auction.prices.buyNow;
      const blockchain = art.blockchain || 'ethereum';

      if (!price || !nftId) {
        setContractLoading(false);
        return toast.error('Not available copies for buy');
      }

      await api.art.reserve(art['_id']);
      // const contractResponse =
      await send('nftBuy', {
        price,
        blockchain,
        quantity: 1,
        tokenId: nftId,
        seller: sellerWallet,
      });

      // await api.art.buyNow(art['_id'], {
      //   contractTX: contractResponse.transactionHash,
      // });

      toast.success('You have successfully purchased NFT');

      if (cb) {
        cb();
      }

      setContractLoading(false);

      close();

      navigate(`/art/${art['_id']}`);
    } catch (e) {
      console.log(e);
      const error = e as AxiosError;
      setContractLoading(false);

      toast.error(error.message ? error.message : e as string);

      if (error.response?.status === 401) {
        navigate('/signIn');
      }
    }
  };

  useEffect(() => {
    let mounted = true;

    api.art.getSingle(id).then(({ data }) => {
      if (mounted) {
        setArt(data);
        setIsLoaded(true);
      }
    }).catch(e => console.log(e));

    return () => {
      mounted = false;
    };
  }, [id]);

  return (
    <div className={styles.root}>
      {isLoaded && art ? (
        <div className={styles.root__main}>
          <div className={styles.root__header}>
            <h1 className={styles.root__title}>Buy NFT</h1>
            <button onClick={close} className={styles.root__close}>
              <CloseIcon width={24} height={24} fill="#000" />
            </button>
          </div>
          <div className={styles.root__table}>
            <Heading />
            {art.copies && art.copies[0] && (
              <Copy
                title={art.title}
                preview={art.image}
                price={art.auction?.prices.buyNow || art.price}
                seller={art.users[art.copies[0].seller]}
                blockchain={art.blockchain || 'ethereum'}
              />
            )}
          </div>
          <Controls
            availableMethods={AVAILABLE_METHODS}
            paymentMethod={paymentMethod}
            changePayment={changePayment}
            confirm={confirm}
            close={close}
          />
        </div>
      ) : (
        <Loading />
      )}

      {contractLoading && (
        <Loading />
      )}
    </div>
  );
};

export default BuyNow;
