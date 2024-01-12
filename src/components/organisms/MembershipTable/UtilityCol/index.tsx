import styles from './style.module.scss';

interface IProps {
  memberships: string[];
}

const UtilityCol = ({ memberships }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__heading}>
      <div className={styles.root__text}>Membership benefits</div>
    </div>
    <ul className={styles.root__list}>
      {memberships.map((item, index) => (
        <li key={index} className={styles.root__list_item}>{item}</li>
      ))}
    </ul>
  </div>
);

export default UtilityCol;
