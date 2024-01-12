import Slider from 'react-slick';
import moment from 'moment';
import classNames from 'classnames';
import { IBanner } from '@constants/types';
import { ExternalLink } from '@components/atoms';
import Countdown from './Countdown';

import './slider.css';
import styles from './style.module.scss';

interface IProps {
  banners: IBanner[];
  className?: string;
}

const sliderSettings = {
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: 1,
  slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: true,
};

const currentTime = moment().valueOf();
const MainBanners = ({
  banners,
  className,
}: IProps) => (
  <div className={classNames(styles.root, 'mainBannerSlickRoot', className)}>
    <Slider className={styles.root_slider} {...sliderSettings}>
      {banners.map(({
        title,
        description,
        countdown,
        image,
        url,
        buttonName,
      }, index) => (
        <div key={index} className={styles.root__item}>
          <img src={image as string} alt="banner" className={styles.root__item_image} />
          <div className={styles.root__item_wrapper}>
            {title && (
              <h1 style={{ color: title.color }} className={styles.root__item_title}>
                {title.label}
              </h1>
            )}
            {description && (
              <p style={{ color: description.color }} className={styles.root__item_description}>{description.label}</p>
            )}
            {!!url && (
              <ExternalLink to={url} noBlank className={styles.root__item_link}>
                {!!buttonName && buttonName}

                {!buttonName && (() => {
                  if (countdown && moment(countdown.endsAt).valueOf() - currentTime > 0) {
                    return 'Live soon';
                  }

                  return 'Live now';
                })()}
              </ExternalLink>
            )}
          </div>
          {!!countdown && <Countdown date={countdown.endsAt} color={countdown.color} />}
        </div>
      ))}
    </Slider>
  </div>
);

export default MainBanners;
