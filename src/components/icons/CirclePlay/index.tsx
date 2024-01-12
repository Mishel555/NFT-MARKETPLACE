interface IProps {
  fill?: string;
}

const CirclePlay = ({ fill = 'white' }: IProps) => (
  <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 6.76795C16.3333 7.53775 16.3333 9.46225 15 10.2321L3.75 16.7272C2.41667 17.497 0.75 16.5348 0.75 14.9952V2.00481C0.75 0.46521 2.41667 -0.497042 3.75 0.272758L15 6.76795Z"
      fill={fill}
    />
  </svg>
);

export default CirclePlay;
