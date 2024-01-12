interface IProps {
  fill?: string;
}

const CirclePause = ({ fill = 'none' }: IProps) => (
  <svg viewBox="0 0 18 18" fill={fill} xmlns="http://www.w3.org/2000/svg">
    <path d="M5 17L5 1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
    <path d="M13 17L13 1" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default CirclePause;
