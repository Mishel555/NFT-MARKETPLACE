interface propTypes {
  width?: number;
  height?: number;
  fill?: string;
}

const StopAndPlay = ({ width = 24, height = 24, fill = 'white' }: propTypes) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.59426 16.6699L4.10861 15.7957L4.59426 16.6699ZM4.59426 7.33014L4.10861 8.2043L4.59426 7.33014ZM5.0799 6.45599L11.9122 10.2517L10.9409 12L4.10861 8.2043L5.0799 6.45599ZM11.9122 13.7483L5.0799 17.544L4.10861 15.7957L10.9409 12L11.9122 13.7483ZM5 7.67981V16.3202H3V7.67981H5ZM5.0799 17.544C4.14676 18.0624 3 17.3877 3 16.3202H5C5 15.8627 4.50853 15.5735 4.10861 15.7957L5.0799 17.544ZM11.9122 10.2517C13.2838 11.0137 13.2838 12.9863 11.9122 13.7483L10.9409 12L10.9409 12L11.9122 10.2517ZM4.10861 8.2043C4.50853 8.42648 5 8.1373 5 7.67981H3C3 6.61233 4.14676 5.93757 5.0799 6.45599L4.10861 8.2043Z"
      fill={fill}
    />
    <path d="M16 17L16 7" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    <path d="M20 17L20 7" stroke={fill} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default StopAndPlay;
