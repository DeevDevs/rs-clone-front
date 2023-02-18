import React from 'react';
import MapComponent from '../../../../../components/MapComponent';
import styles from './TripDetailsMap.module.scss';

const TripDetailsMap = () => (
  <div className={styles.details_map}>
    <h3>Crossed 1415 kilometers</h3>
    <MapComponent />
  </div>
);

export default TripDetailsMap;
