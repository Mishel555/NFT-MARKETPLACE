import { Control } from 'react-hook-form';
import { IExhibitionFormValues } from '@constants/types';
import ImageField from '../ImageField';
import InfoPart from '../InfoPart';

import styles from './style.module.scss';

interface IProps {
  control: Control<IExhibitionFormValues>;
  onUpload: (file: File | null) => void;
  preview: string | null;
}

const TopFields = ({
  control,
  onUpload,
  preview,
}: IProps) => (
  <div className={styles.root}>
    <ImageField onUpload={onUpload} preview={preview} />
    <InfoPart control={control} />
  </div>
);

export default TopFields;
