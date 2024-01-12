import { IFee } from '@constants/types';
import { WhiteFixedFee, WhiteMultipleFee } from '@components/atoms';

interface IProps {
  fee: IFee;
}

const WhiteFeePaige = ({ fee }: IProps) => fee.percents.length > 1 ?
  <WhiteMultipleFee fee={fee} />
  :
  <WhiteFixedFee fee={fee} />;

export default WhiteFeePaige;
