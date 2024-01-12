import { Fragment, useCallback, useEffect, useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames';
import { IMarketArt, IProfileArtType } from '@constants/types';
import Paths from '@constants/paths';
import api from '@services/api';
import { useCurrency } from '@hooks';
import { MarketCard } from '@components/molecules';
import { InternalLink } from '@components/atoms';

import './slider.css';
import styles from './style.module.scss';

const sliderSettings = (itemsCount: number) => ({
  infinite: true,
  speed: 500,
  arrows: false,
  slidesToShow: itemsCount > 4 ? 4 : itemsCount,
  slidesToScroll: 1,
  swipeToSlide: true,
  autoplay: true,
  customPaging: () => <li />,
  responsive: [
    {
      breakpoint: 1366,
      settings: {
        slidesToShow: itemsCount > 3 ? 3 : itemsCount,
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: itemsCount > 2.5 ? 2.5 : itemsCount,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: itemsCount > 2 ? 2 : itemsCount,
      },
    },
    {
      breakpoint: 600,
      settings: {
        dots: true,
        slidesToShow: itemsCount > 1.5 ? 1.5 : itemsCount,
      },
    },
    {
      breakpoint: 480,
      settings: {
        dots: true,
        slidesToShow: 1,
      },
    },
  ],
});


const ArtsSection = () => {
  const { currency } = useCurrency();
  const [arts, setArts] = useState<IMarketArt[]>([]);

  const isUsd = currency === 'USD';

  const loadArts = useCallback(async () => {
    try {
      const temp: IMarketArt[] = [];

      const { data } = await api.art.getAll({
        status: 'published',
        sort: '-updatedAt',
        perPage: 10,
      });

      data.arts.map((art: IProfileArtType) => {
        temp.push({
          _id: art['_id'],
          user: art.artist,
          likes: art.likes,
          price: art.price,
          art,
        });
      });

      setArts(temp);
    } catch (e) {
      console.log(e);
    }
  }, []);


  useEffect(() => {
    loadArts();
  }, [loadArts]);

  return (
    <Fragment>
      {!!arts.length && (
        <section className={styles.root}>
          <div className={styles.root__wrapper}>
            <h1 className={styles.root__title}>
              featured artworks
            </h1>
            <InternalLink to={Paths.MARKETPLACE} className={styles.root__viewAll}>view all</InternalLink>
          </div>
          <div className={classNames(styles.root__slider, 'arts-slider-root')}>
            <Slider {...sliderSettings(arts.length)}>
              {arts.map((art, index) => (
                <MarketCard key={index} art={art} fromCarousel isUsd={isUsd} />
              ))}
            </Slider>
          </div>
        </section>
      )}
    </Fragment>
  );
};

export default ArtsSection;
