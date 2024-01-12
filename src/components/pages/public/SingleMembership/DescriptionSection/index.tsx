import styles from './style.module.scss';

interface IProps {
  description: string;
}

const DescriptionSection = ({ description }: IProps) => (
  <div className={styles.root}>
    <h2 className={styles.root__title}>
      Description
    </h2>
    <p className={styles.root__text}>
      {description}
    </p>
  </div>
);

export default DescriptionSection;
