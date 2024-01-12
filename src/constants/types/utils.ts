import { UserRoles } from '@constants/types';

export interface IGetProfitArgs {
  price: number;
  role: UserRoles;
  resold: boolean;
  galleryFee: number;
  collaboratorsFees: number[];
}
