import React, { useEffect } from 'react';
import SignUpLoginContainer from './SignUpLoginContainer';
import Statistics from './Statistics';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';

import MainMap from './MainMap';
import { mapboxActions } from '../../../store/mapbox';

const MainPage = () => {
  const { id } = useAppSelector((state) => state.userReducer);
  const dispatchApp = useAppDispatch();
  const cbChangeCallMapboxState = (): void => {
    dispatchApp(mapboxActions.changeCallPage('main'));
  };

  useEffect(() => {
    cbChangeCallMapboxState();
  }, []);

  return (
    <main className={styles.main}>
      <MainMap />
      {!id ? <SignUpLoginContainer /> : <Statistics />}
    </main>
  );
};

export default MainPage;
