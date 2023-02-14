import React, { useCallback, useEffect } from 'react';
import SignUpLoginContainer from './SignUpLoginContainer';
import Statistics from './Statistics';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { isLoggedIn } from '../../../store/user/userThunks';

const MainPage = () => {
  const { id } = useAppSelector((state) => state.userReducer);
  const dispatchApp = useAppDispatch();
  const callbackIsLoggedIn = useCallback(async () => {
    await dispatchApp(isLoggedIn());
  }, []);
  useEffect(() => {
    callbackIsLoggedIn();
  }, []);
  return (
    <main className={styles.main}>
      This is map
      {!id ? <SignUpLoginContainer /> : <Statistics />}
    </main>
  );
};

export default MainPage;
