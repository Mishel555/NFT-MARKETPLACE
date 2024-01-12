import classNames from 'classnames';

import styles from './style.module.scss';

interface IProps {
  labels: string[];
  toggleDataVisibility: (index: number) => void;
  hiddenItems: number[];
}

const lineColors: string[] = ['#FFBD00', '#76448A', '#5DADE2', '#E74C3C', '#58D68D', '#BCFFAD', '#FFB8D7', '#B8C2FF', '#DDFFB8', '#B8FFFB'];

const LabelController = ({
  labels,
  toggleDataVisibility,
  hiddenItems,
}: IProps) => (
  <div className={styles.root}>
    {labels.map((label, index) => (
      <button
        key={index}
        onClick={() => toggleDataVisibility(index)}
        className={classNames(styles.root__label, hiddenItems.includes(index) && styles.root__label_hidden)}
      >
        <span style={{ backgroundColor: lineColors[index] }} className={styles.root__label_circle} />
        <span className={styles.root__label_text}>{label}</span>
      </button>
    ))}
  </div>
);

export default LabelController;
