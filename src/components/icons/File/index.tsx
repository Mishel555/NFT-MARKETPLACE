interface IPropTypes {
  fill?: string;
}

const File = ({ fill = '#979493' }: IPropTypes) => (
  <svg width={25} height={25} viewBox="0 0 25 20" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M21 9v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.28a2 2 0 0 1 1.9 1.37L12.72 7H19a2 2 0 0 1 2 2Z"
      fill={fill}
    />
  </svg>
);

export default File;
