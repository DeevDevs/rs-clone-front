import React, { useState, useEffect } from 'react';
import styles from './style.module.scss';
import { useAppSelector } from '../../store';

const LoadingComp = () => {
  const { statsLoading } = useAppSelector((state) => state.statsReducer);
  const { userLoading } = useAppSelector((state) => state.userReducer);
  const { memoirLoading } = useAppSelector((state) => state.memoirReducer);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (statsLoading || userLoading || memoirLoading) {
      setIsLoading(true);
      return;
    }
    if (!statsLoading && !userLoading && !memoirLoading) {
      setIsLoading(false);
    }
  }, [statsLoading, userLoading, memoirLoading]);
  return (
    <div className={`${styles.container} ${isLoading ? '' : styles.container__gone}`}>
      <div className={styles.earth}>
        <div className={styles.plane} />
      </div>

    </div>
  );
};

export default LoadingComp;
