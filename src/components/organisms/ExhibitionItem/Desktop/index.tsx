import { useState } from 'react';
import { IExhibition } from '@constants/types';
import Full from '../Full';
import Preview from '../Preview';

import styles from './style.module.scss';

interface IProps {
  data: IExhibition;
  size?: 'sm' | 'md';
  deleteExhibition?: (id: string) => void;
  editExhibition?: (id: string) => void;
}

const Desktop = ({
  data,
  size = 'md',
  deleteExhibition,
  editExhibition,
}: IProps) => {
  const [isOpened, setIsOpened] = useState<boolean>(false);

  const open = () => {
    if (!data.description) {
      return;
    }

    setIsOpened(true);
  };
  const close = () => setIsOpened(false);

  return (
    <div className={styles.root}>
      {isOpened ? (
        <Full
          data={data}
          deleteExhibition={deleteExhibition}
          editExhibition={editExhibition}
          close={close}
        />
      ) : (
        <Preview
          data={data}
          size={size}
          open={open}
          deleteExhibition={deleteExhibition}
          editExhibition={editExhibition}
        />
      )
      }
    </div>
  );
};

export default Desktop;
