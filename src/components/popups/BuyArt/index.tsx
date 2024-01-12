import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { METAMASK_DEEP_LINK } from '@constants/environment';
import { IBuyArt, IProfileArtType, ICopy, INft, IMultipleBuy } from '@constants/types';
import api from '@services/api';
import { useAuth, useWeb3, usePopup } from '@hooks';
import { filterByKey, groupCopies, isObjectEmpty } from '@utils';
import Heading from './Heading';
import Table from './Table';
import Controls from './Controls';
import Loading from './Loading';

import EthIcon from '@assets/icons/black-eth-icon.svg';
// import CardIcon from '@assets/icons/credit-card-black.svg';
import styles from './style.module.scss';

interface ICart {
  [key: string]: {
    count: number;
    total: number;
    nfts: INft[];
  };
}

interface IChangeCart {
  seller: string;
  count: number;
  price: number;
  total: number;
  checked: boolean;
  nfts: INft[];
}

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

const BuyArt = ({ id, cb }: IBuyArt) => {
  const { send } = useWeb3();

  const { close } = usePopup();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [art, setArt] = useState<IProfileArtType | null>(null);
  const [copies, setCopies] = useState<ICopy[] | null>(null);
  const [cart, setCart] = useState<ICart | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [paymentMethod, setPaymentMethod] = useState<string>(AVAILABLE_METHODS[0].label);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [contractLoading, setContractLoading] = useState<boolean>(false);
  const [highlightCheckboxes, setHighlightCheckboxes] = useState<boolean>(false);

  const changeCart = useCallback((data: IChangeCart) => {
    if (!copies) return;

    setHighlightCheckboxes(false);

    const {
      nfts,
      count,
      total,
      price,
      seller,
      checked,
    } = data;

    const foundedCopies = copies.find(copy => (
      copy.seller.wallet === seller && copy.nfts.some(nft => nft.price === price)
    ));

    if (!foundedCopies) return;

    const temp: ICart = { ...cart };
    const newKey = `${seller}_${price}`;

    if (checked) {
      temp[newKey] = {
        count,
        total,
        nfts: [...nfts].slice(0, count),
      };
    } else {
      delete temp[newKey];
    }

    let value = 0;
    Object.keys(temp).forEach(key => value += temp[key].total);

    setCart(temp);
    setTotal(value);
  }, [cart, copies]);

  const onSearch = useCallback((search: string) => {
    console.log(search);
  }, []);

  const changePayment = (index: number) => {
    setPaymentMethod(AVAILABLE_METHODS[index].label);
  };

  const buyViaStripe = async (cart: ICart) => {
    if (!user || !art) {
      return;
    }

    const copyIds: string[] = [];
    Object.keys(cart).forEach(seller => {
      const item = cart[seller];
      const nftIds: {
        id: number;
        count: number;
      }[] = [];

      item.nfts.forEach(({ nftId }) => {
        if (!nftId) return;

        const foundedIndex = nftIds.findIndex(({ id }) => id === nftId);

        if (foundedIndex > -1) {
          nftIds[foundedIndex].count += 1;
        } else {
          nftIds.push({
            id: nftId,
            count: 1,
          });
        }
      });

      copyIds.push(...item.nfts.map(copy => copy['_id']));
    });

    await api.art.buyViaStripe(art['_id'], { copyIds });
  };

  const buy = async (cart: ICart) => {
    if (!art) return;

    const copyIds: string[] = [];
    const data: IMultipleBuy = {
      tokenIds: [],
      sellers: [],
      counts: [],
      amount: total,
      blockchain: art.blockchain || 'ethereum',
    };

    Object.keys(cart).forEach(seller => {
      const item = cart[seller];
      const price = item.nfts[0].price;

      const nftIds: {
        id: number;
        count: number;
      }[] = [];

      item.nfts.forEach(({ nftId }) => {
        if (!nftId) return;

        const foundedIndex = nftIds.findIndex(({ id }) => id === nftId);

        if (foundedIndex > -1) {
          nftIds[foundedIndex].count += 1;
        } else {
          nftIds.push({
            id: nftId,
            count: 1,
          });
        }
      });

      nftIds.forEach(({
        id,
        count,
      }) => {
        data.tokenIds.push(id);
        data.counts.push(count);
        data.sellers.push(seller.replaceAll(`_${price}`, ''));
      });

      copyIds.push(...item.nfts.map(copy => copy['_id']));
    });

    // const response =
    await send('nftMultipleBuy', data, {
      redirectUrl: `${METAMASK_DEEP_LINK}/art/${id}`,
    });

    // await api.art.buy(id, {
    //   copyIds,
    //   contractTX: response.transactionHash,
    // });

    return navigate(`/art/${art['_id']}`);
  };

  const confirm = async () => {
    try {
      if (!art || !cart || !Object.keys(cart).length) {
        return setHighlightCheckboxes(true);
      }

      setContractLoading(true);

      const copiesWithNft: ICart = {};

      Object.keys(cart).forEach((seller) => {
        const full: INft[] = [];
        const sellerItems = cart[seller];

        sellerItems.nfts.forEach(nft => {
          full.push(nft);
        });

        if (full.length) {
          copiesWithNft[seller] = {
            nfts: full,
            count: full.length,
            total: full.reduce((previousValue, currentValue) => previousValue + currentValue.price, 0),
          };
        }
      });

      if (isObjectEmpty(copiesWithNft)) {
        setContractLoading(false);
        return toast.error('Not available copies for buy');
      }

      if (paymentMethod !== 'Crypto') {
        await buyViaStripe(copiesWithNft);

        if (cb) {
          cb();
        }

        close();
        return navigate(`/art/${id}`);
      }

      await buy(copiesWithNft);

      toast.success('You have successfully purchased NFT');
      if (cb) {
        cb();
      }

      setContractLoading(false);
      close();
      navigate(`/art/${id}`);
    } catch (e) {
      const error = e as AxiosError;
      setContractLoading(false);

      console.log(e);
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
        const { copies: artCopies } = data as IProfileArtType;
        const copiesForSale = artCopies ? filterByKey(
          artCopies.filter(nft => !nft.owner && (user && user['_id']) !== nft.seller), 'seller',
        ) : {};

        setArt(data);
        setIsLoaded(true);
        setCopies(groupCopies(copiesForSale, data.users, data.title).filter(copy => copy.price));
      }
    }).catch(e => console.log(e));

    return () => {
      mounted = false;
    };
  }, [id, user]);

  return (
    <div className={styles.root}>
      {isLoaded && art && !!art.blockchain ? (
        <div className={styles.root__main}>
          <Heading />
          <Table
            copies={copies}
            blockchain={art.blockchain}
            preview={art.isImage ? art.preview : art.image}
            highlight={highlightCheckboxes}
            onSearch={onSearch}
            changeCart={changeCart}
          />
          <Controls
            count={cart ? Object.keys(cart).length : 0}
            total={total}
            blockchain={art.blockchain}
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

export default BuyArt;
