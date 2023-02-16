import React from 'react';
import StatisticItem from '../../../../../components/StatisticItem';
import styles from './TripInfo.module.scss';
import { StatisticsItemsText } from '../../../../../enums';

const TripInfo = () => {
  const satisfaction = {
    maximum: 10,
    text: StatisticsItemsText.Satisfaction,
  };
  return (
    <div className={styles.trip_info}>
      <h3>Edinburgh</h3>
      <p>Scotland, Europe</p>
      <p>October, 2021</p>
      <StatisticItem
        mark={5}
        maximum={satisfaction.maximum}
        text={satisfaction.text}
      />
      <p>Destinations</p>
      <p>Edinburgh Castle, Botanic Garden, National Galleries, Arthur’s Seat</p>
    </div>
  );
};

export default TripInfo;
