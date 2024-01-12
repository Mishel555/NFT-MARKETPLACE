import Paths from '@constants/paths';
import { AVAILABLE_NETWORKS } from '@constants/web3';
import { ETHEREUM_MARKETPLACE_TX, POLYGON_MARKETPLACE_TX } from '@constants/environment';
import { MainLogo } from '@components/icons';
import { ExternalLink, InternalLink } from '@components/atoms';

import EthereumIcon from '@assets/icons/eth-icon.svg';
import PolygonIcon from '@assets/icons/polygon-purple-icon.svg';
import styles from './style.module.scss';

const ETHEREUM_CONTRACT = `${AVAILABLE_NETWORKS.ethereum.blockExplorerUrls[0]}/address/${ETHEREUM_MARKETPLACE_TX}#code`;
const POLYGON_CONTRACT = `${AVAILABLE_NETWORKS.polygon.blockExplorerUrls[0]}/address/${POLYGON_MARKETPLACE_TX}#code`;

const RightsSection = () => (
  <div className={styles.root}>
    <MainLogo fill="white" />
    <div className={styles.root__content}>
      <div className={styles.root__group}>
        <div className={styles.root__group_item}>
          <InternalLink to={Paths.TERMS}>Terms and Conditions</InternalLink>
          <InternalLink to={Paths.PRIVACY}>Privacy Policy</InternalLink>
        </div>
        <div className={styles.root__group_item}>
          <ExternalLink to={ETHEREUM_CONTRACT}>
            <img alt="ethereum" src={EthereumIcon} className={styles.root__icon} />
            Smart Contract
          </ExternalLink>
          <ExternalLink to={POLYGON_CONTRACT}>
            <img alt="polygon" src={PolygonIcon} className={styles.root__icon} />
            Smart Contract
          </ExternalLink>
        </div>
      </div>
      <p className={styles.root__text}>
        (c) Art In Space {new Date().getFullYear()}. All rights are reserved
      </p>
    </div>
  </div>
);

export default RightsSection;
