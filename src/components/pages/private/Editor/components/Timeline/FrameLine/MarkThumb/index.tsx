interface propTypes {
  height?: number;
}

const MarkThumb = ({ height = 900 }: propTypes) => (
  <svg width="14" height={height} viewBox={`0 0 14 ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11 1C11.9428 1 12.4142 1 12.7071 1.29289C13 1.58579 13 2.05719 13 3V9.06325C13 9.52389 13 9.75421 12.9056
      9.95578C12.8112 10.1574 12.6342 10.3048 12.2804 10.5997L8.28037 13.933C7.66816 14.4432 7.36205 14.6983 7
      14.6983C6.63795 14.6983 6.33184 14.4432 5.71963 13.933L1.71963 10.5997C1.36576 10.3048 1.18882 10.1574 1.09441
      9.95578C1 9.75421 1 9.52389 1 9.06325V3C1 2.05719 1 1.58579 1.29289 1.29289C1.58579 1 2.05719 1 3 1L11 1Z"
      fill="#EE6C40"
      stroke="#EE6C40"
      strokeWidth="2"
    />
    <path d={`M7 14V${height}`} stroke="#EE6C40" strokeWidth="2" />
  </svg>
);

export default MarkThumb;
