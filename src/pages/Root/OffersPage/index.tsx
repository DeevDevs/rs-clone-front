import React from 'react';
import styles from './style.module.scss';
import toursStore from '../../../data/toursStore';
import SwiperComp from './Swiper';
import keyGenerator from '../../../functions/index';

const OffersPage = () => (
  <main className={styles.container}>
    <h2 className={styles.header}>
      Our team has prepared some trips and tours for you
    </h2>
    {toursStore.map(({ name, data }) => (
      <div
        className={styles.swiperContainer}
        key={keyGenerator('swiperComp')}
      >
        <h3 className={styles.continentHeader}>{name}</h3>
        <SwiperComp
          tours={data}
        />
      </div>
    ))}
  </main>
);

export default OffersPage;
