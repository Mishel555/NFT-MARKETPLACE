interface IProps {
  width?: number;
  height?: number;
  direction?: 'top' | 'right' | 'bottom' | 'left';
  fill?: string;
  className?: string;
}

const Arrow = ({
  width = 25,
  height = 24,
  direction = 'bottom',
  fill = '#000',
  className,
}: IProps) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={styles[direction]}
    className={className}
  >
    <path
      d="M12.5 20L11.7929 20.7071L12.5 21.4142L13.2071 20.7071L12.5 20ZM13.5 5C13.5 4.44772 13.0523 4 12.5 4C11.9477 4 11.5 4.44772 11.5 5L13.5 5ZM5.79289 14.7071L11.7929 20.7071L13.2071 19.2929L7.20711 13.2929L5.79289 14.7071ZM13.2071 20.7071L19.2071 14.7071L17.7929 13.2929L11.7929 19.2929L13.2071 20.7071ZM13.5 20L13.5 5L11.5 5L11.5 20L13.5 20Z"
      fill={fill}
    />
  </svg>
);

const styles = {
  top: {
    transform: 'rotate(180deg)',
  },
  right: {
    transform: 'rotate(-90deg)',
  },
  bottom: {},
  left: {
    transform: 'rotate(90deg)',
  },
};

export default Arrow;
