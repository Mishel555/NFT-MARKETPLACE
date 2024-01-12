import { ChangeEvent, useEffect, useRef, useState, useCallback } from 'react';
import classNames from 'classnames';
import { CurrencyType } from '@constants/types';
import { useCurrency } from '@hooks';
import { CloseIcon } from '@components/icons';

import UsdIcon from '@assets/icons/usd-black-icon.svg';
import EthIcon from '@assets/icons/black-eth-icon.svg';
import MaticIcon from '@assets/icons/polygon-purple-icon.svg';
import EthMaticIcon from '@assets/icons/ethereum-matic-icon.svg';

import styles from './style.module.scss';
import animatedStyles from '@styles/animations.module.scss';

const Currency = () => {
  const { currency, isOpened, toggle, close, changeCurrency, isRemember } = useCurrency();

  const rootRef = useRef<HTMLDivElement | null>(null);

  const [remember, setRemember] = useState<boolean>(false);

  const onChange = (currency: CurrencyType) => {
    close();
    changeCurrency(currency, remember);
  };

  const checkBoxHandle = (e: ChangeEvent<HTMLInputElement>) => {
    setRemember(e.target.checked);
    changeCurrency(currency, e.target.checked);
  };

  useEffect(() => {
    if (remember !== isRemember) {
      setRemember(isRemember);
    }

    // DO NOT REMOVE NEXT LINE
    // eslint-disable-next-line
  }, [isRemember]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      close();
    }
  }, [close]);

  useEffect(() => {
    document.addEventListener('click', listener);

    return () => document.removeEventListener('click', listener);
  }, [listener]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button onClick={toggle} className={styles.root__btn}>
        {currency === 'USD' ? (
          <img src={UsdIcon} alt="icon" className={styles.root__icon} />
        ) : (
          <img src={EthMaticIcon} alt="icon" className={styles.root__icon} />
        )}
      </button>
      {isOpened && (
        <div className={classNames(styles.root__content, isOpened && animatedStyles.born_via_fade)}>
          <div className={styles.root__heading}>
            <h1 className={styles.root__heading_title}>Currency</h1>
            <button className={styles.root__close} onClick={close}>
              <CloseIcon fill="#000" width={24} height={24} />
            </button>
          </div>
          <div className={styles.root__wrapper}>
            <p className={styles.root__wrapper_text}>select actual currency</p>
            <div className={styles.root__actions}>
              <button
                onClick={() => onChange('USD')}
                className={classNames(styles.root__action, currency === 'USD' && styles.root__action_active)}
              >
                <img src={UsdIcon} alt="currency" className={styles.root__action_usdIcon} />
                <span className={styles.root__action_text}>USD</span>
              </button>
              <button
                onClick={() => onChange('ETH')}
                className={classNames(styles.root__action, currency === 'ETH' && styles.root__action_active)}
              >
                <img src={EthIcon} alt="currency" className={styles.root__action_cryptoIcon} />
                <span className={styles.root__action_text}>ETH</span>
                <span className={styles.root__action_text}>/</span>
                <img src={MaticIcon} alt="currency" className={styles.root__action_cryptoIcon} />
                <span className={styles.root__action_text}>matic</span>
              </button>
            </div>
          </div>
          <div className={styles.root__checkbox}>
            <input type="checkbox" id="remember-currency" checked={remember} onChange={checkBoxHandle} />
            <label htmlFor="remember-currency">
              Remember this choice
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default Currency;
