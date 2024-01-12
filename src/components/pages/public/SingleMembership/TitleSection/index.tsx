import { MembershipBadge } from '@components/atoms';
import { MembershipType } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  title: string;
  type: MembershipType;
}

const TitleSection = ({
  title,
  type,
}: IProps) => (
  <div className={styles.root}>
    <h1 className={styles.root__title}>
      {title}
    </h1>
    <div className={styles.root__block}>
      <MembershipBadge type={type} />
    </div>
  </div>
);

export default TitleSection;
