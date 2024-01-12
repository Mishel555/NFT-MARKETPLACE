import { FieldValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { EditableFixedFee, EditableMultipleFee } from '../../atoms';

interface IPropTypes {
  option: number;
  register: UseFormRegister<FieldValues>;
  watch: UseFormWatch<FieldValues>;
  setValue: UseFormSetValue<FieldValues>;
}

const EditableFeePaige = ({
  option,
  register,
  watch,
  setValue,
}: IPropTypes) => (
  <div>
    {option > 2 ? (
      <EditableMultipleFee setValue={setValue} register={register} watch={watch} count={option - 1} />
    ) : (
      <EditableFixedFee setValue={setValue} register={register} />
    )}
  </div>
);

export default EditableFeePaige;
