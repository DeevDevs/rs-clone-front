import React from 'react';
import MainMap from '../../../MainPage/MainMap';
import styles from './TripDetailsMap.module.scss';

const TripDetailsMap = () => (
  <div className={styles.details_map}>
    <h3>Crossed 1415 kilometers</h3>
    <MainMap />
  </div>
);

export default TripDetailsMap;
