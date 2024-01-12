import { useState } from 'react';
import classNames from 'classnames';
import { useFormatSeconds } from '@hooks';
import { CaretArrowIcon } from '@components/icons';
import { ILightRGB } from '@constants/types';

import style from './style.module.scss';

interface IPropTypes {
  title: string;
  scripts: {
    name?: string;
    values: number[];
    intensity?: number;
    type?: string;
    temperature?: string;
    color?: ILightRGB;
  }[];
}

const CollapseMenu = ({
  title,
  scripts,
}: IPropTypes) => {
  const [isHidden, setIsHidden] = useState<boolean>(true);

  return (
    <div className={style.collapse_menu}>
      <div className={style.collapse_menu__controller}>
        <span className={style.collapse_menu__title}>
          {title}
        </span>
        <button
          onClick={() => setIsHidden(!isHidden)}
          className={classNames(style.hide_button, !isHidden && style.opened_hide_button)}
        >
          <CaretArrowIcon />
        </button>
      </div>
      {!isHidden && (
        <div className={style.collapse_menu__data}>
          {scripts.length ? (
            <ol>
              {scripts.map(({ values, name }, index) => (
                <li key={index}>
                  <div>
                    <p>
                      {useFormatSeconds(values[0])}
                      &nbsp;-&nbsp;
                      {useFormatSeconds(values[1])}
                    </p>
                    &nbsp;
                    <p>
                      {name && name}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          ) : <span>Nothing to show</span>}
        </div>
      )}
    </div>
  );
};

export default CollapseMenu;
