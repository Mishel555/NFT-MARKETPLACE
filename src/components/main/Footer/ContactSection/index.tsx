import {
  AIS_ADDRESS, AIS_EMAIL,
  AIS_INSTAGRAM_NAME,
  AIS_INSTAGRAM_URL,
  AIS_PHONE,
  AIS_TWITTER_NAME,
  AIS_TWITTER_URL,
} from '@constants/contacts';

import EmailIcon from '@assets/icons/email-light-icon.svg';
import InstagramIcon from '@assets/icons/instagram-light-icon.svg';
import TwitterIcon from '@assets/icons/twitter-light-icon.svg';
import styles from './style.module.scss';

const ContactSection = () => (
  <div className={styles.root}>
    <p className={styles.root__title}>
      contact us:
    </p>
    <div className={styles.root__content}>
      <p className={styles.root__address}>
        {AIS_ADDRESS}
      </p>
      <a href={`tel:${AIS_PHONE}`} className={styles.root__phone}>
        {AIS_PHONE}
      </a>
      <div className={styles.root__group}>
        <div className={styles.root__group_item}>
          <a href={AIS_INSTAGRAM_URL}>
            <img alt="Instagram" src={InstagramIcon} className={styles.root__icon} />
          </a>
          <span className={styles.root__text}>
            {AIS_INSTAGRAM_NAME}
          </span>
        </div>
        <div className={styles.root__group_item}>
          <a href={AIS_TWITTER_URL}>
            <img alt="Twitter" src={TwitterIcon} className={styles.root__icon} />
          </a>
          <span className={styles.root__text}>
            {AIS_TWITTER_NAME}
          </span>
        </div>
        <div className={styles.root__group_item}>
          <a href={`mailto: ${AIS_EMAIL}`}>
            <img alt="Email" src={EmailIcon} className={styles.root__group_icon} />
          </a>
          <span className={styles.root__text}>
            {AIS_EMAIL}
          </span>
        </div>
      </div>
    </div>
  </div>
);

export default ContactSection;
