import moment from 'moment';
import { ExternalLink } from '@components/atoms';
import Countdown from './Countdown';

import styles from './style.module.scss';

const endDate = '2023-02-23T23:00:00.000Z';
const url = 'https://boulevart.artinspacegallery.art/';

const currentTime = moment().valueOf();
const MainBanners = () => (
  <div className={styles.root}>
    <div className={styles.root__wrapper}>
      <div className={styles.root__item}>
        <div className={styles.root__item_wrapper}>
          <h1 className={styles.root__item_title}>
            ARTINSPACE LAUNCH
            <br />
            BOULEVART FEST
          </h1>

          <p className={styles.root__item_date}>
            DATES <br />
            23__26.02.2023
          </p>
          <p className={styles.root__item_description}>
            We are pleased to invite artists, galleries and projects from across the Web3 community to join us at
            Boulevart, a three-day event
            aimed at celebrating Dubai’s position as a hub for the Web3 global community. Every day, we will have 20
            showcase slots for a
            presentation by an artist or a curated selection from a gallery. Web3 projects and DAOs will also be invited
            to apply for
            exhibition space at Foundry, Downtown. Each accepted project will be shown on a dedicated screen during the
            duration of the event
            offering an overall level of curation and ensuring a seamless journey for viewers.
          </p>
          <a href={url} className={styles.root__item_more}>
            LEARN MORE ABOUT EVENT
          </a>
        </div>
      </div>
      <Countdown date={endDate} color={'#fff'}>
        <ExternalLink to={url} noBlank className={styles.root__item_link}>
          {(() => {
            if (moment(endDate).valueOf() - currentTime > 0) {
              return 'Don\'t miss event';
            }

            return 'Live now';
          })()}
        </ExternalLink>
      </Countdown>
    </div>
  </div>
);

export default MainBanners;
