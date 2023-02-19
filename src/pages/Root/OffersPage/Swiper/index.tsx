/* eslint-disable arrow-body-style */
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { OfferProps } from '../../../../interfaces';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper.min.css';
import Offer from '../Offer';
import keyGenerator from '../../../../functions/index';

const SwiperComp: React.FC<OfferProps> = ({ tours }) => {
  return (
    <Swiper
      loopedSlides={null}
      loop
      slidesPerView="auto"
      freeMode
      modules={[Navigation, Pagination]}
      navigation
      pagination={{
        clickable: true,
      }}
    >
      {tours.map(({
        header, info, img, rating,
      }) => (
        <SwiperSlide key={keyGenerator('SwiperSlide')}>
          <Offer
            header={header}
            info={info}
            img={img}
            rating={rating}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default SwiperComp;
