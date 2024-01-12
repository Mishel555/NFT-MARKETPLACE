import { IFee } from '@constants/types';
import { FixedFee, MultipleFee } from '@components/atoms';

interface IPropTypes {
  fee: IFee;
  isMultipleAbsolute?: boolean;
  isFixedCenter?: boolean;
  isMultipleOpened?: boolean;
  setIsParentOpened?: (isOpened: boolean) => void;
}

const FeePaige = ({
  fee,
  isFixedCenter,
  isMultipleAbsolute,
  isMultipleOpened,
  setIsParentOpened,
}: IPropTypes) => (
  fee.percents.length > 1 ? (
    <MultipleFee
      fee={fee}
      absolute={isMultipleAbsolute}
      setIsParentOpened={setIsParentOpened}
      defaultOpened={isMultipleOpened}
    />
  ) : (
    <FixedFee fee={fee} isCentered={isFixedCenter} />
  )
);

export default FeePaige;
