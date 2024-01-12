import { WEB_API_ORIGIN } from '@constants/environment';
import { IGetProfitArgs } from '@constants/types/utils';
import axios from '@services/api/axios';
import { AvailableNetworks, ICopy, IArtUser, IFee, INft, UserRoles } from '@constants/types';

// min and max included...
export const getRandomInt = (min: number, max: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const camelize = (str: string): string => (
  str.replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => (
    index === 0 ? word.toLowerCase() : word.toUpperCase()
  )).replace(/\s+/g, '')
);

export const getDynamicQuery = (): { [key: string]: string } => {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return Object.fromEntries(urlSearchParams.entries());
};

export const downloadArtFile = (id: string, token: string) => {
  const tag = document.createElement('a');
  tag.href = `${WEB_API_ORIGIN}/api/art/${id}/realDownload?token=${token}`;
  document.body.appendChild(tag);
  tag.click();
  document.body.removeChild(tag);
};

export const getShortAddress = (address: string): string => (`${
  address.split('').splice(0, 7).join('')}
  ...
  ${address.split('').splice(-4, 4).join('')
}`);

export const getWithoutNDecimal = (num: number, n: number) =>
  Number(num.toFixed(n).replace(`.${new Array(n).fill('0').join('')}`, ''));

export const b64DecodeUnicode = (str: string): string =>
  // Going backwards: from bytestream, to percent-encoding, to original string.
  decodeURIComponent(atob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

export const formatBytes = (bytes: number, decimals = 2): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
};

export const getFileUrl = (file: File): string => URL.createObjectURL(file);

export const downloadFile = (file: Blob | string, filename: string, fileExtension: string) => {
  const link = document.createElement('a');
  link.download = `${filename}.${fileExtension}`;

  if (typeof file !== 'string') {
    link.href = URL.createObjectURL(file);
  } else {
    link.href = file;
  }

  link.click();
};

// EXAMPLE Mon Oct 03 2022 17:15:43 GMT+0400 => Mon Oct 03 2022 00:00:00 GMT+0400
export const convertDateToInitialTime = (date: Date): Date => {
  const convertedDate = date;
  date.setMilliseconds(0);
  date.setSeconds(0);
  date.setMinutes(0);
  date.setHours(0);

  return convertedDate;
};

export const isSourceAvailable = (src: string): Promise<boolean | undefined> => (
  axios.get(src)
    .then((data) => {
      if (data.status === 200) {
        return true;
      }
    })
    .catch(e => {
      console.log(e);
      return false;
    })
);

// Return artist profit...
export const getArtistProfit = ({
  role,
  price,
  resold,
  galleryFee,
  collaboratorsFees,
}: IGetProfitArgs): number => {
  const AIF_FEE = 0.12;
  const RESELL_FEE = 0.208;
  // const ADMIN_FEE = 0.1;

  collaboratorsFees.forEach(fee => {
    if (fee) {
      price = price - price * fee / 100;
    }
  });

  if (role === 'admin') {
    return price;
  }

  if (resold) {
    return price - price * RESELL_FEE;
  }

  if (galleryFee) {
    const galleryPart = price * galleryFee / 100;
    const aifPart = galleryPart * AIF_FEE;

    return price - galleryPart - aifPart;
  }

  return price - price * AIF_FEE;
};

export const filterByKey = <T extends object>(
  data: T[],
  keyName: string,
  nestedKey?: string,
): { [key: string]: T[] } => {
  const map = new Map();
  const result: { [key: string]: T[] } = {};

  data.forEach(item => {
    Object.keys(item).forEach(key => {
      if (key !== keyName) {
        return;
      }

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      const name = nestedKey ? item[key][nestedKey] : item[key];

      if (map.has(name)) {
        map.set(name, [...map.get(name), item]);
      } else {
        map.set(name, [item]);
      }
    });
  });

  const keys = Array.from(map.keys());

  keys.forEach(key => {
    result[key] = map.get(key);
  });

  return result;
};

export const groupCopies = (
  data: { [key: string]: INft[] },
  users: { [key: string]: IArtUser },
  artName: string,
): ICopy[] => {
  const map = new Map();

  Object.keys(data).forEach((key) => {
    const nfts = data[key];

    nfts.forEach(nft => {
      const nftUser = users[nft.seller];
      const key = `${nft.price}:${nftUser.wallet}`;

      const copy: ICopy = {
        seller: nftUser,
        title: artName,
        price: nft.price,
        availableCount: nfts.filter(item => item.price === nft.price).length,
        nfts: nfts.filter(item => item.price === nft.price),
      };

      if (!map.has(key)) {
        map.set(key, copy);
      }
    });
  });

  return Array.from(map.values());
};

export const copyToClipBoard = async (text: string | number) => {
  if (navigator.clipboard) {
    return await navigator.clipboard.writeText(text.toString());
  }
};


interface IGalleryFee {
  fee: IFee;
  priceInUsd: number;
}

export const getGalleryFee = ({ fee, priceInUsd }: IGalleryFee): number => {
  const { amounts, percents } = fee || {};

  if (amounts === undefined || percents === undefined) {
    return 0;
  }

  let galleryFee: number;

  if (percents.length < 3) {
    if (percents.length === 1) {
      galleryFee = percents[0];
    } else if (priceInUsd > amounts[1]) {
      galleryFee = percents[1];
    } else {
      galleryFee = percents[0];
    }
  } else {
    if (priceInUsd > amounts[2]) {
      galleryFee = percents[2];
    } else if (priceInUsd > amounts[1]) {
      galleryFee = percents[1];
    } else {
      galleryFee = percents[0];
    }
  }

  return galleryFee || 0;
};

export const getBlockchainCurrency = (blockchain: AvailableNetworks) => {
  switch (blockchain) {
    case 'ethereum':
      return 'eth';
    case 'polygon':
      return 'matic';
    default:
      return '';
  }
};

export const getProfilePublicRoute = (id: string, role?: UserRoles): string => {
  if (role === 'user') return `/profile/${id}`;

  if (role === 'gallery') return `/profile/${id}/showroom`;

  if (role === 'artist') return `/profile/${id}/gallery`;

  return `/profile/${id}/arts`;
};
