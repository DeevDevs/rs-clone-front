import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper';
import { OfferProps } from '../../../../interfaces';

import Offer from '../Offer';
import keyGenerator from '../../../../functions/index';

const SwiperComp: React.FC<OfferProps> = ({ tours }) => (
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
      header, info, images, rating, id,
    }) => (
      <SwiperSlide key={keyGenerator('SwiperSlide')}>
        <Offer
          header={header}
          info={info}
          images={images}
          rating={rating}
          id={id}
        />
      </SwiperSlide>
    ))}
  </Swiper>
);

export default SwiperComp;
