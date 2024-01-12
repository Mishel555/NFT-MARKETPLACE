import { Control, FieldValues, UseFormSetValue } from 'react-hook-form';
import TextField from '../TextField';
import TypeBox from '../TypeBox';
import EmotionBox from '../EmotionBox';
import styles from './style.module.scss';

interface IProps {
  control: Control;
  setValue: UseFormSetValue<FieldValues>;
}

const DescriptionSection = ({
  control,
  setValue,
}: IProps) => (
  <div className={styles.root}>
    <TextField type="input" name="title" label="Title" control={control} placeholder="Insert NFT title here" />
    <div className={styles.root__block}>
      <TypeBox control={control} setValue={setValue} />
      <EmotionBox control={control} setValue={setValue} />
    </div>
    <TextField type="area" name="description" label="Description" control={control} />
  </div>
);

export default DescriptionSection;
