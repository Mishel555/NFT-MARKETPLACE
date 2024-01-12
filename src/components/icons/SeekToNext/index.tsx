interface propTypes {
  width?: number;
  height?: number;
  fill?: string;
}

const SeekToNext = ({ width = 16, height = 14, fill = 'white' }: propTypes) => (
  <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M15 3C15 2.05719 15 1.58579 14.7071 1.29289C14.4142 1 13.9428 1 13 1H6.93675C6.47611 1 6.24579 1 6.04422 1.09441C5.84265 1.18882 5.6952 1.36576 5.40031 1.71963L2.06697 5.71963C1.5568 6.33184 1.30171 6.63795 1.30171 7C1.30171 7.36205 1.5568 7.66816 2.06697 8.28037L5.40031 12.2804C5.6952 12.6342 5.84265 12.8112 6.04422 12.9056C6.24579 13 6.47611 13 6.93675 13H13C13.9428 13 14.4142 13 14.7071 12.7071C15 12.4142 15 11.9428 15 11V3Z"
      stroke={fill}
      strokeWidth="2"
    />
  </svg>
);

export default SeekToNext;
