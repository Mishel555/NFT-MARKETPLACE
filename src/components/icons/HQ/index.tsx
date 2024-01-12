interface IPropTypes {
  fill?: string;
}

const HQ = ({ fill = '#979493' }: IPropTypes) => (
  <svg width={25} height={25} viewBox="0 0 48 38" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 0h48v48H0z" fill="none"></path>
    <path
      d="M38 8H10c-2.21 0-4 1.79-4 4v24c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4V12c0-2.21-1.79-4-4-4zM22 30h-3v-4h-4v4h-3V18h3v5h4v-5h3v12zm14-2a2 2 0 0 1-2 2h-1.5v3h-3v-3H28a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v8zm-7-1h4v-6h-4v6z"
      fill={fill}
    >
    </path>
  </svg>
);

export default HQ;
