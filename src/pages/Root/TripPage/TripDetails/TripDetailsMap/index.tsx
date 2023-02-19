import React from 'react';
import MapComponent from '../../../../../components/MapComponent';
import { useAppSelector } from '../../../../../store';
import { MapProps } from '../../../../../types';
import styles from './TripDetailsMap.module.scss';

const TripDetailsMap = () => {
  const { distance, longLat, destinationName } = useAppSelector((state) => state.memoirReducer);
  const [longTo, latTo] = longLat;
  const locationTolong = longTo || 45.9809;
  const locationToLat = latTo || 51.8531;

  const newMapData: MapProps = {
    newLocation: [locationTolong, locationToLat],
    markerName: `Go to ${destinationName}`,
  };
  return (
    <div className={styles.details_map}>
      <h3>{`Crossed ${distance} kilometers`}</h3>
      <MapComponent newMapInfo={newMapData} />
    </div>
  );
};

export default TripDetailsMap;
