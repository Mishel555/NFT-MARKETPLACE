import { Control } from 'react-hook-form';
import { IExhibitionFormValues } from '@constants/types';
import InputField from '../InputField';
import styles from './style.module.scss';

interface IProps {
  control: Control<IExhibitionFormValues>;
}

const InfoPart = ({ control }: IProps) => (
  <div className={styles.root}>
    <div className={styles.root__main}>
      <h3 className={styles.root__title}>
        Exhibitions Name
      </h3>
      <InputField
        control={control}
        name="title"
        placeholder="Revival of Aesthetics"
      />
    </div>
    <ul className={styles.root__list}>
      <li className={styles.root__list__item}>
        <InputField
          control={control}
          name="day"
          placeholder="11"
          label="Day"
        />
      </li>
      <li className={styles.root__list__item}>
        <InputField
          control={control}
          name="month"
          placeholder="01"
          label="Month"
        />
      </li>
      <li className={styles.root__list__item}>
        <InputField
          control={control}
          name="year"
          placeholder="2023"
          label="Year"
        />
      </li>
    </ul>
    <div className={styles.root__block}>
      <div className={styles.root__wrapper}>
        <InputField
          control={control}
          name="city"
          placeholder="Dubai UAE"
          label="Country/City"
        />
      </div>
      <div className={styles.root__wrapper}>
        <InputField
          control={control}
          name="state"
          placeholder="South pasquale"
          label="State"
        />
      </div>
    </div>
  </div>
);

export default InfoPart;
