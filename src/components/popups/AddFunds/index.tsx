import { ReactElement, useState } from 'react';
import { IAddFundsPopup } from '@constants/types';
import { usePopup } from '@hooks';
import { ArrowIcon, CloseIcon } from '@components/icons';
import Tabs from './Tabs';
import CryptoForm from './CryptoForm';
import FiatForm from './FiatForm';

import styles from './style.module.scss';

interface ITab {
  label: string;
  icon: ReactElement;
}

const TABS: ITab[] = [
  {
    label: 'Deposit crypto',
    icon: <ArrowIcon />,
  },
  // {
  //   label: 'Buy with a card',
  //   icon: <CreditCardIcon />,
  // },
];

const AddFunds = ({
  artId,
  price,
  tokenId,
  blockchain,
  cb,
}: IAddFundsPopup) => {
  const { close } = usePopup();

  const [activeTab, setActiveTab] = useState<number>(0);

  const onTabChange = (tab: number) => {
    setActiveTab(tab);
  };

  return (
    <div className={styles.root}>
      <div className={styles.root__container}>
        <h1 className={styles.root__container_title}>Add funds</h1>
        <Tabs tabs={TABS} activeTab={activeTab} onChange={onTabChange} />
        {(() => {
          switch (activeTab) {
            case 0:
              return <CryptoForm artId={artId} tokenId={tokenId} price={price} blockchain={blockchain} cb={cb} />;
            case 1:
              return <FiatForm />;
          }
        })()}
        <button onClick={close} className={styles.root__close}>
          <CloseIcon width={24} height={24} fill="#000" />
        </button>
      </div>
    </div>
  );
};

export default AddFunds;
