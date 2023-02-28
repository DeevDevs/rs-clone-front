import React from 'react';
import StatisticItem from '../../../../../components/StatisticItem';
import styles from './TripInfo.module.scss';
import { StatisticsItemsText } from '../../../../../enums';
import { useAppSelector } from '../../../../../store';
import months from '../../../../../constants/tripPage';
import { getGradeText } from '../../../../../functions';

const TripInfo = () => {
  const satisfaction = {
    maximum: 10,
    text: StatisticsItemsText.Satisfaction,
  };

  const {
    destinationName,
    countryName,
    continentName,
    date,
    rateValue,
    days,
    sites,
  } = useAppSelector((state) => state.memoirReducer);

  const newDate = new Date(date);
  const tripDate = `${months[newDate.getMonth()]}, ${newDate.getFullYear()}`;

  return (
    <div className={styles.trip_info}>
      <h3>{destinationName}</h3>
      <p>{`${countryName}, ${continentName}`}</p>
      <p>{`On ${tripDate} ${days} days trip`}</p>
      <StatisticItem
        mark={rateValue}
        maximum={satisfaction.maximum}
        text={getGradeText(rateValue)}
      />
      <p>Sites</p>
      <p>{sites.join(', ')}</p>
    </div>
  );
};

export default TripInfo;
