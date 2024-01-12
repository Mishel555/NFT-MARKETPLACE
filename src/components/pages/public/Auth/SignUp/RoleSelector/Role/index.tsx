import styles from './style.module.scss';
import classNames from 'classnames';

interface IPropTypes {
    name: string;
    title: string;
    description: string;
    selectedRole: string | null;
    selectRole: (role: string) => void;
}

const Role = ({
                  name,
                  title,
                  description,
                  selectedRole,
                  selectRole,
              }: IPropTypes) => (
    <div className={classNames(styles.root, selectedRole === name ? styles.selected : styles.root__disabled)}
         onClick={() => selectRole(name)}>
        <div className={styles.root_block}>
            <h1 className={styles.root_block__title}>
                {title}
            </h1>
            <p className={styles.root_block__description}>
                {description}
            </p>
        </div>
    </div>
);

export default Role;
