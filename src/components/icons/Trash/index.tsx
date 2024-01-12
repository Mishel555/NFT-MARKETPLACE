interface IProps {
  width?: number;
  height?: number;
  fill?: string;
}

const Trash = ({
  width = 14,
  height = 12,
  fill = '#fff',
}: IProps) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M8.34375 1.06836V2.38086H0.34375V1.06836H2.34375L3 0.380859H5.65625L6.34375 1.06836H8.34375ZM1 9.72461V3.06836H7.65625V9.72461C7.65625 10.0788 7.52083 10.3913 7.25 10.6621C7 10.9329 6.69792 11.0684 6.34375 11.0684H2.34375C1.98958 11.0684 1.67708 10.9329 1.40625 10.6621C1.13542 10.3913 1 10.0788 1 9.72461ZM9 5.72461H13V7.06836H9V5.72461ZM9 3.06836H13.6562V4.38086H9V3.06836ZM9 8.38086H11.6562V9.72461H9V8.38086Z"
      fill={fill}
    />
  </svg>

);

export default Trash;
