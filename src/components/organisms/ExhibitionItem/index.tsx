import { Fragment } from 'react';
import { IExhibition } from '@constants/types';
import Desktop from './Desktop';
import Mobile from './Mobile';

interface IProps {
  data: IExhibition;
  size?: 'sm' | 'md';
  deleteExhibition?: (id: string) => void;
  editExhibition?: (id: string) => void;
}

const ExhibitionItem = ({
  data,
  size = 'md',
  deleteExhibition,
  editExhibition,
}: IProps) => (
  <Fragment>
    <Desktop data={data} size={size} deleteExhibition={deleteExhibition} editExhibition={editExhibition} />
    <Mobile data={data} deleteExhibition={deleteExhibition} editExhibition={editExhibition} />
  </Fragment>
);

export default ExhibitionItem;
