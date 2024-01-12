import { Fragment, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import classNames from 'classnames';
import { ISettingsPath, UserRoles } from '@constants/types';
import { InternalLink } from '@components/atoms';

import ArrowDown from '@assets/icons/settings/arrow-down-black.svg';
import styles from './style.module.scss';

interface IProps {
  paths: { [key in UserRoles]: ISettingsPath };
  role: UserRoles;
  currentPath: string;
}

const Mobile = ({
  paths,
  role,
  currentPath,
}: IProps) => {
  const prettyPaths = useMemo(() => Object.values(paths[role]).map(item => item).flat(), [paths, role]);

  const rootRef = useRef<HTMLDivElement | null>(null);

  const [isShow, setIsShow] = useState<boolean>(false);
  const [pathLabel, setPathLabel] = useState<string>('');

  const toggle = useCallback(() => setIsShow(prevState => !prevState), []);
  const close = useCallback(() => setIsShow(false), []);

  const getPathLabel = useCallback(() => {
    const foundedPath = prettyPaths.find(path => path.path === currentPath);

    if (foundedPath) {
      setPathLabel(foundedPath.label);
    }
  }, [prettyPaths, currentPath]);

  const listener = useCallback((e: MouseEvent) => {
    if (!rootRef.current?.contains(e.target as Element)) {
      close();
    }
  }, [close]);

  useEffect(() => {
    document.addEventListener('click', listener);
    return () => document.removeEventListener('click', listener);
  }, [listener]);

  useEffect(() => {
    getPathLabel();
  }, [getPathLabel]);

  return (
    <div ref={rootRef} className={styles.root}>
      <button onClick={toggle} className={classNames(styles.root__dropdown, isShow && styles.root__dropdown_active)}>
        {pathLabel}
        <img src={ArrowDown} alt="" />
      </button>
      {isShow && (
        <Fragment>
          {Object.keys(paths[role]).map((key, index) => (
            <div key={index}>
              <p className={styles.root__subtitle}>
                {key}
              </p>
              <ul className={styles.root_list}>
                {paths[role][key].map(({
                  path,
                  label,
                  image,
                  disabled,
                  external,
                }, index) => (
                  <li
                    key={index}
                    onClick={close}
                    className={classNames(
                      styles.root_list__item,
                      currentPath === path && styles.root_list__item_active,
                      disabled && styles.root_list__item_disabled,
                    )}
                  >
                    <InternalLink
                      to={external ? path : `/settings/${path}`}
                      className={styles.root_list__link}
                    >
                      <img src={image} className={styles.root_list__icon} alt="Icon" />
                      {label}
                    </InternalLink>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </Fragment>
      )}
    </div>
  );
};

export default Mobile;
