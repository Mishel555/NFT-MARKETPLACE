import classNames from 'classnames';
import { ISettingsPath, UserRoles } from '@constants/types';
import { InternalLink } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  paths: { [key in UserRoles]: ISettingsPath };
  role: UserRoles;
  currentPath: string;
}

const Desktop = ({
  paths,
  role,
  currentPath,
}: IProps) => (
  <div className={styles.root}>
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
  </div>
);

export default Desktop;
