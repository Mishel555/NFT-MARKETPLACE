import { useMemo } from 'react';
import classNames from 'classnames';
import { MEMBERSHIP } from '@constants/membership';

import Desktop from './Desktop';
import Mobile from './Mobile';

import styles from './style.module.scss';

interface IProps {
  className?: string;
}

const MembershipTable = ({ className }: IProps) => {
  const { types, data } = useMemo(() => ({
    types: MEMBERSHIP.map(item => item.label),
    data: {
      'Standard Membership': MEMBERSHIP.map(item => ({ available: item.standard })),
      'Platinum Membership': MEMBERSHIP.map(item => ({ available: item.platinum, feature: item.platinumFeature })),
      none: MEMBERSHIP.map(item => ({ available: item.nonMember })),
    },
  }), []);

  return (
    <div className={classNames(styles.root, className)}>
      <Desktop types={types} data={data} />
      <Mobile types={types} data={data} />
    </div>
  );
};

export default MembershipTable;
