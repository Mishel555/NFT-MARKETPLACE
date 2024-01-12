import { Fragment, useMemo } from 'react';
import { ETHEREUM_MARKETPLACE_TX, POLYGON_MARKETPLACE_TX } from '@constants/environment';
import { ArtStatusType, ArtType, AvailableNetworks, ITypes, IVideoMetaInfo } from '@constants/types';
import { AVAILABLE_NETWORKS } from '@constants/web3';
import { formatBytes, getShortAddress } from '@utils';
import { ExternalLink } from '@components/atoms';

import styles from './style.module.scss';

interface IProps {
  status: ArtStatusType;
  info: IVideoMetaInfo;
  type: ITypes;
  nftType: ArtType;
  tokenId?: number;
}

const CONTRACTS: { [key in AvailableNetworks]: string | undefined } = {
  polygon: POLYGON_MARKETPLACE_TX,
  ethereum: ETHEREUM_MARKETPLACE_TX,
};

const LABELS: { [key: string]: string } = {
  processed: 'Draft',
  approval: 'Admin Approval',
  review: 'Collaborators\' review',
  pending: 'Gallery Approval',
  rejected: 'Rejected',
  onCollaboratorsReview: 'Collaboration Review',
  onGalleryApproval: 'Gallery Approval',
};

const DetailsSection = ({ status, info, type, nftType, tokenId }: IProps) => {
  const {
    width,
    height,
    size,
    blockchain,
    typeName,
  } = useMemo(() => ({
    ...info,
    typeName: type?.name ?? '',
  }), [info, type]);

  return (
    <div className={styles.root__details}>
      <div className={styles.root__block}>
        <h3 className={styles.root__title}>
          ARTWORK DETAILS
        </h3>
        <ul className={styles.root__list}>
          <li>
            Medium
            <span>
              {nftType}
            </span>
          </li>
          <li>
            Dimensions
            <span>
            {`${width}x${height}`}
          </span>
          </li>
          <li>
            File Size
            <span>
            {formatBytes(size)}
          </span>
          </li>
          <li>
            Status
            <span>
            {LABELS[status] ?? status}
          </span>
          </li>
          {!!blockchain && !!tokenId && (
            <Fragment>
              <li>
                Token Standard
                <span>
                  ERC-1155
                </span>
              </li>
              <li>
                Blockchain
                <span>
                  {blockchain}
                </span>
              </li>
              <li>
                TokenID
                <span>
                  {tokenId}
                </span>
              </li>
              <li>
                Contract
                <ExternalLink
                  to={`${AVAILABLE_NETWORKS[blockchain].blockExplorerUrls[0]}/address/${CONTRACTS[blockchain]}`}>
                  {getShortAddress(CONTRACTS[blockchain] || '')}
                </ExternalLink>
              </li>
            </Fragment>
          )}
        </ul>
      </div>
      <div className={styles.root__block}>
        <h3 className={styles.root__title}>
          Type of art
        </h3>
        <ul className={styles.root__list}>
          <li>
            {typeName}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DetailsSection;
