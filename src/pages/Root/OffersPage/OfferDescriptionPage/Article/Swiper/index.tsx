import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation } from 'swiper';
import keyGenerator from '../../../../../../functions';
import styles from './style.module.scss';

const OfferImagesSwiper = ({ images }: { images: string[] | undefined }) => (
  <Swiper
    loopedSlides={null}
    loop
    slidesPerView={2}
    centeredSlides
    freeMode
    allowTouchMove={false}
    initialSlide={0}
    spaceBetween={100}
    modules={[Navigation, Autoplay]}
    autoplay={{
      delay: 3000,
      pauseOnMouseEnter: true,
    }}
    navigation
    className={styles.swiper}
  >
    {images?.map((image) => (
      <SwiperSlide
        key={keyGenerator('offerSliderImg')}
        className={styles.slide}
      >
        <img
          src={image}
          alt="offerSliderImg"
          className={styles.image}
        />
      </SwiperSlide>
    )) }
  </Swiper>
);

export default OfferImagesSwiper;
