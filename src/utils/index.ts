import { CollaboratorStatusType, ICollaborator, IProfileArtType, IUser, PublishPopupActionTypes } from '@constants/types';

export { default as mergeDeep } from './mergeDeep';
export { convertBack, convertFront } from './convertActuations';

const SELL_STATUSES = ['processed', 'owned', 'approved', 'published', 'closed'];
const REVIEW_STATUSES = ['approval', 'onCollaboratorsReview', 'onGalleryApproval'];

export const getPublishPopupAction = (
  art: IProfileArtType,
  artist: IUser,
  user?: IUser | null,
  resell?: boolean,
): PublishPopupActionTypes => {
  if (!user) return 'default';

  if (resell) return 'resell';

  const { status, collaborators } = art;

  const iAmCreator = user['_id'] === artist['_id'];
  const hasRejectedCollaborator = collaborators?.findIndex(coll => coll.feedback) > -1;

  if (user.role.name === 'admin' && iAmCreator) {
    if (!collaborators.length && status === 'processed') return 'publish';
    if (collaborators.length && status === 'approval') return 'publish';
  }

  if (iAmCreator && status !== 'processed' && hasRejectedCollaborator) return 'return';

  if (iAmCreator && status === 'rejected') return 'return';

  if (REVIEW_STATUSES.includes(status) && !iAmCreator) return 'review';

  if (iAmCreator && SELL_STATUSES.includes(status)) return 'publish';

  return 'default';
};

export const getCollaborationStatus = (collaboration: ICollaborator): CollaboratorStatusType => {
  const { agreedAt, feedback } = collaboration;

  if (agreedAt) return 'done';

  if (feedback) return 'declined';

  return 'pending';
};

// { label: 'Draft', status: 'done' },
// { label: 'Colls', status: 'done' },
// { label: 'Gallery', status: 'done' },
// { label: 'Admin', status: 'declined' },
// { label: 'Published', status: 'pending' },

export const getArtStep = (art: IProfileArtType, key: string): CollaboratorStatusType => {
  const { status, collaborators, reason } = art;
  const isCollRejected = collaborators?.findIndex(coll => coll.feedback) > -1;

  const isGallery = reason?.match('Rejected by gallery. Reason:');

  if (status === 'processed') {
    return 'pending';
  }

  if (key === 'Draft') {
    return 'done';
  }

  if (isCollRejected) {
    if (key === 'Collaboration') return 'declined';

    return 'pending';
  }

  if (status === 'onCollaboratorsReview') {
    return 'pending';
  }

  if (status === 'onGalleryApproval') {
    if (key === 'Collaboration') return 'done';

    return 'pending';
  }

  if (status === 'approval') {
    if (key === 'Published' || key === 'Admin') return 'pending';

    return 'done';
  }

  if (status === 'rejected') {
    if (isGallery) {
      if (key === 'Gallery') return 'declined';

      if (key === 'Admin') return 'pending';

      return 'done';
    }

    if (key === 'Admin') return 'declined';

    return 'done';
  }

  return 'done';
};

export * from './serviceWorker';
export * from './common';
export * from './objects';
export * from './permissions';
export * from './colors';
export * from './web3';
