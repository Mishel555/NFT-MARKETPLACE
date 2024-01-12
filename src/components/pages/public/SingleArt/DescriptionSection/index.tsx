import styles from './style.module.scss';

interface IProps {
  description: string;
}

const DescriptionSection = ({ description }: IProps) => (
  <div className={styles.root}>
    <p className={styles.root__text}>
      {description}
    </p>
  </div>
);

export default DescriptionSection;
