interface propTypes {
  width?: number;
  height?: number;
  fill?: string;
}

const BurgerIcon = ({ width = 80, height = 80, fill = 'white' }: propTypes) => (
  <svg width={width} height={height} viewBox="0 0 32 32" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M6.66669 9.33334H25.3334" stroke="black" strokeWidth="2" strokeLinecap="round" />
    <path d="M6.66669 16H20" stroke="black" strokeWidth="2" strokeLinecap="round" />
    <path d="M6.66669 22.6667H14.6667" stroke="black" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default BurgerIcon;
