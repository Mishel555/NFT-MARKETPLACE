import PaymentSelect from '../PaymentSelect';
import Actions from '../Actions';
import styles from './style.module.scss';

interface IProps {
  paymentMethod: string;
  availableMethods: {
    label: string;
    img: string;
  }[];
  changePayment: (index: number) => void;
  confirm: () => void;
  close: () => void;
}

const Controls = ({
  paymentMethod,
  availableMethods,
  changePayment,
  confirm,
  close,
}: IProps) => (
  <div className={styles.root}>
    <PaymentSelect
      availableMethods={availableMethods}
      selectedMethod={paymentMethod}
      setMethod={changePayment}
    />
    <Actions
      close={close}
      confirm={confirm}
    />
  </div>
);

export default Controls;
