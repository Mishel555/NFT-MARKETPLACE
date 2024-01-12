import { FieldValues, useForm } from 'react-hook-form';
import { TextField } from '@components/atoms';
import Header from '../Header';
import GalleryList from './GalleryList';

import styles from './style.module.scss';

interface IProps {
  confirm: (values: FieldValues) => void;
}

interface IForm {
  portfolio: string;
  gallery: string;
}

const GallerySelector = ({ confirm }: IProps) => {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<IForm>();

  const setGallery = (id: string) => {
    setValue('gallery', id);
  };

  return (
    <div className={styles.root}>
      <form onSubmit={handleSubmit(confirm)}>
        <div>
          <Header
            currentStep={4}
            stepLength={4}
            stepTitle=""
          />
          <p className={styles.root_title}>
            <span>
              Finish your profile by adding your portfolio
            </span>
          </p>
        </div>
        <div className={styles.root_main}>
          <div className={styles.root_block}>
            <TextField
              element="input"
              label="Portfolio link*"
              name="url"
              placeholder="https://"
              error={errors.portfolio?.message}
              inputProps={register('portfolio', {
                required: 'Portfolio is required field'
              })}
            />
          </div>
          <div className={styles.root_headers}>
            <p className={styles.root_title}>
              <span>
                Choose your gallery:
              </span>
            </p>
            <p className={styles.root_subtitle}>
              Choose a gallery you'd like to be represented by or let us represent you at Art in Space Foundation by
              default.
            </p>
          </div>
          <GalleryList setGallery={setGallery} />
        </div>
        <div className={styles.root_wrapper}>
          <div className={styles.root_groups}>
            <button type="submit">Confirm</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default GallerySelector;
