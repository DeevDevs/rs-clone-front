import React from 'react';
import styles from './TripSlider.module.scss';
import photo from '../../../../../assets/img/temp-trip.jpg';
import { useAppSelector } from '../../../../../store';

const TripSlider = () => {
  const { memoirPhotos } = useAppSelector((state) => state.memoirReducer);
  return (
    <div className={styles.slider}>
      <img src={(memoirPhotos[0] !== 'default.jpg') ? memoirPhotos[0] : photo} alt="" />
    </div>
  );
};

export default TripSlider;
