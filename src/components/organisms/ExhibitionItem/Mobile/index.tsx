import { useMemo } from 'react';
import { IExhibition } from '@constants/types';
import { InternalLink } from '@components/atoms';
import MobileIntro from '../MobileIntro';
import MobileDetails from '../MobileDetails';

import styles from './style.module.scss';

interface IProps {
  data: IExhibition;
  deleteExhibition?: (id: string) => void;
  editExhibition?: (id: string) => void;
}

const Mobile = ({
  data,
  deleteExhibition,
  editExhibition,
}: IProps) => {
  const { _id } = useMemo(() => data, [data]);

  return (
    <InternalLink to={`/exhibition/${_id}`} className={styles.root}>
      <MobileIntro data={data} />
      <MobileDetails data={data} deleteExhibition={deleteExhibition} editExhibition={editExhibition} />
    </InternalLink>
  );
};

export default Mobile;
