import React, { useState } from 'react';
import styles from './TripSlider.module.scss';
import { useAppSelector } from '../../../../../store';

const TripSlider = () => {
  const { memoirPhotos } = useAppSelector((state) => state.memoirReducer);
  const [currIdx, setCurrIdx] = useState(0);

  const goToPrev = () => {
    if (currIdx === 0) {
      setCurrIdx(memoirPhotos.length - 1);
    } else {
      setCurrIdx(currIdx - 1);
    }
  };

  const goToNext = () => {
    if (currIdx === memoirPhotos.length - 1) {
      setCurrIdx(0);
    } else {
      setCurrIdx(currIdx + 1);
    }
  };

  return (
    <div className={styles.slider}>
      <div>
        {memoirPhotos.length > 1 && (
        <div
          className={styles.slider_leftArrow}
          role="presentation"
          onClick={goToPrev}
        />
        )}
        <div
          style={
          { backgroundImage: `url(${memoirPhotos[currIdx]})` }
        }
          className={styles.slider_imgContainer}
        />
        {memoirPhotos.length > 1 && (
        <div
          className={styles.slider_rightArrow}
          role="presentation"
          onClick={goToNext}
        />
        )}
      </div>
    </div>
  );
};

export default TripSlider;
