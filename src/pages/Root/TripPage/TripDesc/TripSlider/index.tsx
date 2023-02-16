import React from 'react';
import styles from './TripSlider.module.scss';
import photo from '../../../../../assets/img/temp-trip.jpg';

const TripSlider = () => (
  <div className={styles.slider}>
    <img src={photo} alt="" />
  </div>
);

export default TripSlider;
