import React from 'react';
import TripMap from '../../../TripFormPage/TripMapComp';
import styles from './TripDetailsMap.module.scss';

const TripDetailsMap = () => (
  <div className={styles.details_map}>
    <h3>Crossed 1415 kilometers</h3>
    <TripMap />
  </div>
);

export default TripDetailsMap;
