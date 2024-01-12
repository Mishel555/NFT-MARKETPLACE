import Switch from 'react-switch';
import styles from './style.module.scss';

interface IProps {
  id: string;
  title?: string;
  description: string;
  email: boolean;
  push: boolean;
  onChange: (key: string, checked: boolean, type: number) => void;
}

const SetupItem = ({
  id,
  title,
  description,
  email,
  push,
  onChange,
}: IProps) => (
  <li className={styles.root}>
    <div>
      {title && (
        <h5 className={styles.root__title}>{title}</h5>
      )}
      <p className={styles.root__description}>{description}</p>
    </div>
    <div className={styles.root__group}>
      <Switch
        checked={email}
        width={50}
        height={25}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#7A52F4"
        offColor="#CFDBD5"
        offHandleColor="#000"
        handleDiameter={16}
        onChange={(checked) => onChange(id, checked, 0)}
      />
      <Switch
        checked={push}
        width={50}
        height={25}
        checkedIcon={false}
        uncheckedIcon={false}
        onColor="#7A52F4"
        offColor="#CFDBD5"
        offHandleColor="#000"
        handleDiameter={16}
        onChange={(checked) => onChange(id, checked, 1)}
      />
    </div>
  </li>
);

export default SetupItem;
