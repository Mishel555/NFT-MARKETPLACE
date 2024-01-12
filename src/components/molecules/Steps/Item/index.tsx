import { BiTime } from 'react-icons/bi';
import { MdOutlineDone, MdClose } from 'react-icons/md';
import classNames from 'classnames';
import { IStep } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  data: IStep;
  active?: boolean;
}

const STATUS_ICON_MAP: Record<IStep['status'], JSX.Element> = {
  pending: <BiTime color="#7A52F4" />,
  declined: <MdClose color="#7A52F4" />,
  done: <MdOutlineDone color="#7A52F4" />,
};

const StepItem = ({ data, active }: IProps) => {
  const { label, status } = data;

  return (
    <div className={classNames(styles.root, !active && status === 'pending' && styles.root__disabled)}>
      <div className={styles.root__badge}>
        {STATUS_ICON_MAP[status]}
      </div>
      <p className={styles.root__label}>{label}</p>
    </div>
  );
};

export default StepItem;
