interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  direction?: 'top' | 'right' | 'bottom' | 'left';
}

const CaretArrowIcon = ({ width = 7, height = 11, fill = 'white', direction = 'right' }: IProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 7 11"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={styles[direction]}
  >
    <path d="M0.757812 9.74265L5.00045 5.5L0.757813 1.25736" stroke={fill} strokeWidth="2" />
  </svg>
);

const styles = {
  top: {
    transform: 'rotate(-90deg)',
  },
  right: {
  },
  bottom: {
    transform: 'rotate(90deg)',
  },
  left: {
    transform: 'rotate(180deg)',
  },
};

export default CaretArrowIcon;
