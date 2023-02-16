import React from 'react';
import TripDesc from './TripDesc/TripDesc';
import TripDetails from './TripDetails/TripDetails';
import styles from './TripPage.module.scss';

const TripPage = () => (
  <div className={styles.trip}>
    <h2 className={styles.trip_title}> With Leprechauns in the Rain </h2>
    <TripDesc className={styles.trip_desc} />
    <TripDetails className={styles.trip_details} />
  </div>
);

export default TripPage;
