import React from 'react';
import { useAppSelector } from '../../../../../store';
import styles from './TripDetailsStory.module.scss';

const TripDetailsStory = () => {
  const { description } = useAppSelector((state) => state.memoirReducer);
  return (
    <div className={styles.details_story}>
      <h3>Story</h3>
      <p>{description}</p>
    </div>
  );
};

export default TripDetailsStory;
