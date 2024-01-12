import { useMemo } from 'react';
import moment from 'moment';
import classNames from 'classnames';
import { ArtStatusType, RequestStatusType } from '@constants/types';

import styles from './style.module.scss';

interface IProps {
  type: 'all' | ArtStatusType | RequestStatusType;
  date?: string;
}

const CLASSNAMES: { [key: string]: string } = {
  approval: 'OnApproval',
  'sold out': 'sold',
};

const LABELS: { [key: string]: string } = {
  processed: 'Draft',
  approval: 'Admin Approval',
  review: 'Collaborators\' review',
  pending: 'Gallery Approval',
  rejected: 'Rejected',
  onCollaboratorsReview: 'My Team Artwork',
  onGalleryApproval: 'Gallery Approval',

  inReviewByAdmin: 'On Admin review',
  approvedByAdminAt: 'Approved by Admin',
  rejectedByAdminAt: 'Rejected by Admin',
  approvedByGalleryAt: 'Offer approval',
  rejectedByGalleryAt: 'Rejected by Gallery',
  acceptedOfferAt: 'Offer approved',
  declinedOfferAt: 'Offer rejected',

  allArtworks: 'All artworks',
  inMyReview: 'Collaboration',
};

const StatusBadge = ({ type, date }: IProps) => {
  const requestDate = useMemo(() => (moment(date).format('DD/MM/YYYY HH:mm:ss')), [date]);

  return (
    <div className={styles.root}>
      <div className={styles.root__status_wrapper}>
        <span className={classNames(styles.root__circle, styles[`root__circle_${CLASSNAMES[type] ?? type}`])} />
        <span className={styles.root__status}>{LABELS[type] ?? type}</span>
      </div>
      {!!date && (
        <span className={styles.root__date}>
          {requestDate}
        </span>
      )}
    </div>
  );
};

export default StatusBadge;
