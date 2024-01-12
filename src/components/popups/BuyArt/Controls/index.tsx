import { AvailableNetworks } from '@constants/types';
import PaymentSelect from '../PaymentSelect';
import PriceInfo from '../PriceInfo';
import Actions from '../Actions';

import styles from './style.module.scss';

interface IProps {
  total: number;
  count: number;
  paymentMethod: string;
  blockchain: AvailableNetworks;
  availableMethods: {
    label: string;
    img: string;
  }[];
  changePayment: (index: number) => void;
  confirm: () => void;
  close: () => void;
}

const Controls = ({
  total,
  count,
  blockchain,
  paymentMethod,
  availableMethods,
  changePayment,
  confirm,
  close,
}: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      <PaymentSelect
        selectedMethod={paymentMethod}
        availableMethods={availableMethods}
        setMethod={changePayment}
      />
      <PriceInfo price={total} count={count} blockchain={blockchain} />
    </div>
    <Actions
      total={total}
      close={close}
      confirm={confirm}
    />
  </div>
);

export default Controls;
