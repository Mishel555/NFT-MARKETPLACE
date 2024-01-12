interface propTypes {
  width?: number;
  height?: number;
  fill?: string;
}

const Close = ({
  width = 24,
  height = 24,
  fill = 'white',
}: propTypes) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M18 6L6 18" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M6 6L18 18" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default Close;
