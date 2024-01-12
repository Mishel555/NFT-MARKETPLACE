import { useCallback, useState } from 'react';
import { EditPencil } from '@components/icons';

import styles from './style.module.scss';

interface IProps {
  edit: () => void;
}

const ImageController = ({ edit }: IProps) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const onHover = useCallback(() => setIsHovered(true), []);
  const onLeave = useCallback(() => setIsHovered(false), []);

  return (
    <div className={styles.root}>
      <button onClick={edit} onMouseOver={onHover} onMouseLeave={onLeave} className={styles.root__btn}>
        <EditPencil fill={isHovered ? '#fff' : '#7A52F4'} />
      </button>
    </div>
  );
};

export default ImageController;
