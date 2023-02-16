import React from 'react';
import Button from '../../../components/Button';
import TripDesc from './TripDesc/TripDesc';
import TripDetails from './TripDetails/TripDetails';
import styles from './TripPage.module.scss';

const TripPage = () => (
  <div className={styles.trip}>
    <h2 className={styles.trip_title}> With Leprechauns in the Rain </h2>
    <TripDesc className={styles.trip_desc} />
    <TripDetails className={styles.trip_details} />
    <Button className={styles.trip_btn}>Erase this Memoir</Button>
    <Button className={styles.trip_btn}>Edit this Memoir</Button>
  </div>
);

export default TripPage;
