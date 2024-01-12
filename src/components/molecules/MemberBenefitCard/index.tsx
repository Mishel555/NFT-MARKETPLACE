import classNames from 'classnames';
import { IMemberBenefit } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
  data: IMemberBenefit;
  rtl?: boolean;
  className?: string;
}

const MemberBenefitCard = ({ data, rtl, className }: IProps) => (
  <div className={classNames(styles.root, rtl && styles.root__right, className)}>
    <div className={styles.root__area}>
      <img src={data.src} alt="" />
    </div>
    <div className={styles.root__content}>
      <div>
        <h1 className={styles.root__content_title}>{data.title}</h1>
        <p className={styles.root__content_description}>{data.description}</p>
      </div>
      <button disabled className={styles.root__content_btn}>
        Mint membership
      </button>
    </div>
  </div>
);

export default MemberBenefitCard;
