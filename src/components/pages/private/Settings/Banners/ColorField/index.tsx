import { useCallback } from 'react';
import classNames from 'classnames';
import { AvailableBannersFormNames, IBannerColor } from '@constants/types';
import styles from './style.module.scss';

interface IProps {
  name: AvailableBannersFormNames;
  label: string;
  availableColors: IBannerColor[];
  activeColor: string;
  setColor: (name: string, value: string) => void;
}

const ColorField = ({
  name,
  label,
  availableColors,
  activeColor,
  setColor,
}: IProps) => {
  const onClick = useCallback((value: string) => {
    setColor(name, value);
  }, [name, setColor]);

  return (
    <div className={styles.root}>
      <span className={styles.root__title}>{label}</span>
      <div className={styles.root__wrapper}>
        {availableColors.map(({ hex }, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onClick(hex)}
            style={{ backgroundColor: hex }}
            className={classNames(styles.root__color, hex === activeColor && styles.root__color_active)}
          />
        ))}
      </div>
    </div>
  );
};

export default ColorField;
