import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { IBuyMembershipPopup, IProfileArtType } from '@constants/types';
import { useAuth, useWeb3, usePopup } from '@hooks';
import api from '@services/api';
import { CloseIcon } from '@components/icons';
import Loading from './Loading';
import Heading from './Heading';
import Controls from './Controls';
import Copy from './Copy';

import EthIcon from '@assets/icons/black-eth-icon.svg';
import CardIcon from '@assets/icons/credit-card-black.svg';
import styles from './style.module.scss';

const AVAILABLE_METHODS = [
  {
    label: 'Crypto',
    img: EthIcon,
  },
  {
    label: 'Credit or debit card',
    img: CardIcon,
  },
];

const BuyMembership = ({ id, cb, upgrade }: IBuyMembershipPopup) => {
  const { send } = useWeb3();
  const { close } = usePopup();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const [art, setArt] = useState<IProfileArtType | null>(null);

  const [paymentMethod, setPaymentMethod] = useState<string>(AVAILABLE_METHODS[0].label);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const changePayment = (index: number) => {
    setPaymentMethod(AVAILABLE_METHODS[index].label);
  };

  const confirm = async () => {
    try {
      if (!user || !art) return;

      const price = art.price;
      const copies = art.copies;
      const blockchain = art.blockchain || 'ethereum';
      const changedType = art.type.name.replaceAll(' Membership', '');

      if (!copies || !copies.length) {
        return;
      }
      const copy = copies.filter(copy => !copy.owner).pop();

      if (!copy) return;

      // let web3Response;

      if (upgrade) {
        // web3Response =
        await send('membershipUpgrade', {
          price,
          blockchain,
          newType: changedType.toLowerCase(),
          currentType: changedType.toLowerCase() === 'platinum' ? 'standard' : 'platinum',
        });
      } else {
        // web3Response =
        await send('membershipBuy', {
          price,
          blockchain,
          type: changedType.toLowerCase(),
        });
      }

      // const { transactionHash } = web3Response;

      // await api.art.buy(id, {
      //   contractTX: transactionHash,
      //   copyIds: [copy['_id']],
      // });

      if (cb) {
        cb();
      }

      setUser({
        ...user,
        [`has${changedType}Membership`]: true,
      });
      close();
    } catch (e) {
      const error = e as AxiosError;
      console.log(e);
      close();

      toast.error(`${error.response?.data.message || error.message}`);

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
                price={art.price}
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
    </div>
  );
};

export default BuyMembership;
