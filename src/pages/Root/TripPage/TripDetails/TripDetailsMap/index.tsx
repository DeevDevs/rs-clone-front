import React from 'react';
import MapComponent from '../../../../../components/MapComponent';
import { useAppSelector } from '../../../../../store';
import { MapProps } from '../../../../../types';
import styles from './TripDetailsMap.module.scss';

const TripDetailsMap = () => {
  const {
    distance,
    longLat,
    destinationName,
    whereFromLongLat,
  } = useAppSelector((state) => state.memoirReducer);
  const [longTo, latTo] = longLat;
  const [longFrom, latFrom] = whereFromLongLat;

  const newMapData: MapProps = {
    pointTo: {
      baseLocation: [longTo, latTo],
      popupName: `Visited ${destinationName}`,
    },
    pointFrom: {
      baseLocation: [longFrom, latFrom],
      popupName: 'Journey started here',
    },
  };
  return (
    <div className={styles.details_map}>
      <h3>{`Crossed ${distance} kilometers`}</h3>
      <MapComponent
        pointTo={newMapData.pointTo}
        pointFrom={newMapData.pointFrom}
      />
    </div>
  );
};

export default TripDetailsMap;
