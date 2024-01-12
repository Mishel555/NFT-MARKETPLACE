import { useSearchParams } from 'react-router-dom';

import ResetIcon from '@assets/icons/reset-icon.svg';
import styles from './style.module.scss';

interface IProps {
  cb: () => void;
}

const Clear = ({ cb }: IProps) => {
  const [, setSearchParams] = useSearchParams();

  const reset = () => {
    setSearchParams({}, { replace: true });
    cb();
  };

  return (
    <button onClick={reset} className={styles.root}>
      <img src={ResetIcon} alt="reset" />
      <span>Reset</span>
    </button>
  );
};

export default Clear;
