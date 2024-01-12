interface IProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

const CreditCard = ({
  width = 25,
  height = 24,
  fill = '#000',
  className,
}: IProps) => (
  <svg width={width} height={height} viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    <rect x="3.5" y="6" width="18" height="13" rx="2" stroke={fill} strokeWidth="2" />
    <path d="M7.5 15H7.51" stroke={fill} strokeWidth="2" strokeLinecap="round" />
    <path d="M4.5 11H21.5" stroke={fill} strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default CreditCard;
