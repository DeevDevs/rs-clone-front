import React, { useCallback, useEffect } from 'react';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import Places from './Places';
import Kilometers from './Kilometers';
import Marks from './Marks';
// eslint-disable-next-line import/no-named-as-default
import getStats from '../../../../store/stats/statsThunks';

const Statistics = () => {
  const statsObj = useAppSelector((state) => state.statsReducer);
  const { statsID, memoirIDs } = useAppSelector((state) => state.userReducer);
  const dispatchApp = useAppDispatch();
  const callbackGetStats = useCallback(async (userStatsID: string) => {
    await dispatchApp(getStats(userStatsID));
  }, []);

  useEffect(() => {
    callbackGetStats(statsID);
  }, []);
  return (
    <div className={styles.statistics}>
      {memoirIDs.length > 0
        ? (
          <>
            <h2 className={styles.header}>Your statistics</h2>
            <div className={styles.info}>
              <Marks
                places={statsObj.places}
                satisfaction={statsObj.averageRate}
                sites={statsObj.sites.length}
              />
              <Kilometers distance={statsObj.distance} />
              <Places
                continents={statsObj.continents}
                countries={statsObj.countries}
              />
            </div>
          </>
        )
        : (
          <p className={styles.zeroStatisticsMessage}>
            You have not told us about any trip yet. Statistics are not available
          </p>
        )}
    </div>
  );
};

export default Statistics;
