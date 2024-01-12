import { useCallback, useState } from 'react';
import { Control, Controller } from 'react-hook-form';
import { IAccountDetailsFormValues, ISecurityFormValues } from '@constants/types';

import styles from './styles.module.scss';

interface IProps {
  control: Control<ISecurityFormValues | IAccountDetailsFormValues>;
  links: string[];
}

const LinksForm = ({
  links,
  control,
}: IProps) => {
  const [socialLinks, setSocialLinks] = useState<string[]>(links);

  const addMore = useCallback(() => {
    setSocialLinks(prevState => [...prevState, '']);
  }, []);

  return (
    <div className={styles.root}>
      <h2 className={styles.root__subtitle}>
        Social Links
      </h2>
      <div className={styles.root_group}>
        {socialLinks.map((link, index) => (
          <div key={link + index} className={styles.root_group__item}>
            <label className={styles.root_group__label}>
              Link {index + 1}
            </label>
            <Controller
              name={`links.${index}`}
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  value={field.value || ''}
                  type="text"
                  placeholder="https://"
                  className={styles.root_group__input}
                />
              )}
            />
          </div>
        ))}
      </div>
      <div className={styles.root__add}>
        <button type="button" onClick={addMore} disabled={!(socialLinks.length < 2)} className={styles.root__add_btn}>
          Add more
        </button>
      </div>
    </div>
  );
};

export default LinksForm;
