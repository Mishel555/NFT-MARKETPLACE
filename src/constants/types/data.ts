import { CollaboratorStatusType, IUser } from '@constants/types';

export type PublishPopupActionTypes = 'publish' | 'review' | 'default' | 'reject' | 'return' | 'resell';

export interface ICollaborator {
  _id: string;
  user: IUser;
  fee: number;
  comment?: string;
  feedback?: string;
  agreedAt?: boolean;
}

export interface IMemberBenefit {
  title: string;
  description: string;
  src: string;
}

export interface IStep {
  label: string;
  status: CollaboratorStatusType;
}
