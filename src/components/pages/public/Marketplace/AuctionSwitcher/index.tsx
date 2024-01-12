import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Switch from 'react-switch';
import styles from './style.module.scss';

interface IProps {
  setOption: (name: string, options: string | null) => void;
}

const AuctionSwitcher = ({ setOption }: IProps) => {
  const [searchParams] = useSearchParams();
  const auction = searchParams.get('auction');

  const [checked, setChecked] = useState<boolean>(!!auction);

  const onChange = (checked: boolean) => {
    setChecked(checked);
    setOption('auction', checked ? 'true' : null);
  };

  return (
    <div className={styles.root}>
      <span className={styles.root__title}>Auction</span>
      <Switch
        checked={checked}
        width={50}
        height={25}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#7A52F4"
        offColor="#CFDBD5"
        offHandleColor="#fff"
        handleDiameter={16}
        onChange={onChange}
      />
    </div>
  );
};

export default AuctionSwitcher;
