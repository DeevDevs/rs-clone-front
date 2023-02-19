import React, { useCallback, useEffect } from 'react';
import StatisticItem from '../../../../../components/StatisticItem';
import styles from './TripInfo.module.scss';
import { StatisticsItemsText } from '../../../../../enums';
import { useAppDispatch, useAppSelector } from '../../../../../store';
import { getMemoir } from '../../../../../store/memoir/memoirThunks';
import months from '../../../../../constants/tripPage';

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
  const memoirID = window.location.href.split('/').at(-1);
  const dispatchApp = useAppDispatch();

  const callbackGetMemoir = useCallback(async (memoirId: string) => {
    await dispatchApp(getMemoir(memoirId));
  }, []);

  useEffect(() => {
    if (memoirID) {
      callbackGetMemoir(memoirID);
    }
  }, []);

  return (
    <div className={styles.trip_info}>
      <h3>{destinationName}</h3>
      <p>{`${countryName}, ${continentName}`}</p>
      <p>{`On ${tripDate} ${days} days trip`}</p>
      <StatisticItem
        mark={rateValue}
        maximum={satisfaction.maximum}
        text={satisfaction.text}
      />
      <p>Sites</p>
      <p>{sites.join(', ')}</p>
    </div>
  );
};

export default TripInfo;
