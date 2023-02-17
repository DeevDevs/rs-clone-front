import React from 'react';
import SignUpLoginContainer from './SignUpLoginContainer';
import Statistics from './Statistics';
import styles from './style.module.scss';
import { useAppSelector } from '../../../store';

import MainMap from './MainMap';

const MainPage = () => {
  const { id } = useAppSelector((state) => state.userReducer);

  return (
    <main className={styles.main}>
      <MainMap />
      {!id ? <SignUpLoginContainer /> : <Statistics />}
    </main>
  );
};

export default MainPage;
