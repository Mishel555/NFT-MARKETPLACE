import UnCheckedIcon from '@assets/icons/checkbox-unchecked-icon.svg';
import CheckedIcon from '@assets/icons/checkbox-checked-violet-icon.svg';
import styles from './style.module.scss';

interface IProps {
  available: 'yes' | 'no' | 'paid';
  feature?: string;
}

const MemberItem = ({
  available,
  feature,
}: IProps) => (
  <li className={styles.root}>
    <div className={styles.root__wrapper}>
      {(() => {
        switch (available) {
          case 'yes':
            return <img alt="yes" src={CheckedIcon} className={styles.root__img} />;
          case 'no':
            return <img alt="no" src={UnCheckedIcon} className={styles.root__img} />;
          default:
            return '';
        }
      })()}
      <span className={styles.root__type}>{available}</span>
    </div>

    {!!feature && (
      <span className={styles.root__feature}>{feature}</span>
    )}
  </li>
);

export default MemberItem;
