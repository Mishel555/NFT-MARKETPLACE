import classNames from 'classnames';
import Search from '../Search';
import Price from '../Price';
import CheckboxGroup from '../CheckboxGroup';

import ResetIcon from '@assets/icons/reset-icon.svg';

import styles from './style.module.scss';
import AuctionSwitcher from '@components/pages/public/Marketplace/AuctionSwitcher';

interface IPrice {
  min: number;
  max: number;
}

interface IProps {
  options: {
    [key: string]: {
      _id: string;
      name: string; login: string;
    }[];
  };
  minMax: IPrice;
  setOption: (name: string, options: string | null) => void;
  show: boolean;
  close: () => void;
  clearFilters: () => void;
}

const Filters = ({
  options,
  minMax,
  show,
  setOption,
  close,
  clearFilters,
}: IProps) => (
  <div className={classNames(styles.root, show && styles.root__show)}>
    <div className={styles.root_clear}>
      <h1 className={styles.root_clear__title}>
        Filters
      </h1>
      <button className={styles.root_clear__btn} onClick={clearFilters}>
        <img src={ResetIcon} alt="" />
        Reset
      </button>
    </div>
    <Search setOption={setOption} />
    <CheckboxGroup name="artists" options={options.creator} setOption={setOption} />
    <AuctionSwitcher setOption={setOption} />
    <Price minMax={minMax} setOption={setOption} />
    <CheckboxGroup name="emotions" options={options.emotions} setOption={setOption} />
    <CheckboxGroup name="type" options={options.types} setOption={setOption} />
    <button className={classNames(styles.root_clear__btn, styles.root_clear__btn_mobile)} onClick={clearFilters}>
      <img src={ResetIcon} alt="" />
      Reset
    </button>
    <div className={styles.root__close}>
      <button onClick={close}>
        Close
      </button>
    </div>
  </div>
);

export default Filters;
