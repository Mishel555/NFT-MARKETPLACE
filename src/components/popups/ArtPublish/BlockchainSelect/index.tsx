import { useState } from 'react';
import classNames from 'classnames';
import { AvailableNetworks } from '@constants/types';
import { CaretArrowIcon } from '@components/icons';

import EthIcon from '@assets/icons/black-eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

interface IProps {
  defaultBlockchain: AvailableNetworks;
  readonly?: boolean;
  onChange: (network: AvailableNetworks) => void;
}

const AVAILABLE_BLOCKCHAINS = [
  { name: 'ethereum', image: EthIcon },
  { name: 'polygon', image: PolygonIcon },
];

const BlockchainSelect = ({ defaultBlockchain, readonly, onChange }: IProps) => {
  const [show, setShow] = useState<boolean>(false);
  const [blockchain, setBlockchain] = useState<number>(AVAILABLE_BLOCKCHAINS.findIndex(
    ({ name }) => name === defaultBlockchain,
  ));

  const toggle = () => {
    if (readonly) return;

    setShow(prevState => !prevState);
  };

  const selectBlockchain = (index: number) => {
    setShow(false);
    setBlockchain(index);
    onChange(AVAILABLE_BLOCKCHAINS[index].name as AvailableNetworks);
  };

  return (
    <div className={styles.root}>
      <h4 className={styles.root__title}>Blockchain</h4>
      <button
        type="button"
        disabled={readonly}
        onClick={toggle}
        className={classNames(styles.root__btn, show && styles.root__btn_active, readonly && styles.root__disabled)}
      >
        <div className={styles.root__btn_wrapper}>
          <img src={AVAILABLE_BLOCKCHAINS[blockchain].image} alt="blockchain" className={styles.root__image} />
          <span className={styles.root__blockchain}>
            {AVAILABLE_BLOCKCHAINS[blockchain].name}
          </span>
        </div>
        {!readonly && (
          <CaretArrowIcon fill="#000" />
        )}
      </button>
      {show && (
        <ul className={styles.root__wrapper}>
          {AVAILABLE_BLOCKCHAINS.map(({
            name,
            image,
          }, index) => index !== blockchain && (
            <li key={name} onClick={() => selectBlockchain(index)} className={styles.root__item}>
              <img src={image} alt="blockchain" className={styles.root__image} />
              <span className={styles.root__blockchain}>
                {name}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlockchainSelect;
