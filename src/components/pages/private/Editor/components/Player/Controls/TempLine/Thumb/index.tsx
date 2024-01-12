import { IModifiedThumbProps } from '@constants/types';

import style from './style.module.scss';

const Thumb = ({ props }: IModifiedThumbProps) => (
  <div {...props} style={{ ...props.style }}>
    <div className={style.thumb} />
  </div>
);

export default Thumb;
