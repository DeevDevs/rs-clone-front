import React, { useCallback, useEffect } from 'react';
import SignUpLoginContainer from './SignUpLoginContainer';
import Statistics from './Statistics';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../store';
import { isLoggedIn } from '../../../store/user/userThunks';
import MainMap from './MainMap';
import { getMemoirPreviews } from '../../../store/memoir/memoirThunks';

const MainPage = () => {
  const { id } = useAppSelector((state) => state.userReducer);
  const dispatchApp = useAppDispatch();
  const callbackIsLoggedIn = useCallback(async () => {
    await dispatchApp(isLoggedIn());
  }, []);
  const callbackGetMemoirPreviews = useCallback(async () => {
    await dispatchApp(getMemoirPreviews());
  }, []);

  useEffect(() => {
    callbackIsLoggedIn();
  }, []);

  useEffect(() => {
    if (!id) return;
    callbackGetMemoirPreviews();
  }, [id]);

  return (
    <main className={styles.main}>
      <MainMap />
      {!id ? <SignUpLoginContainer /> : <Statistics />}
    </main>
  );
};

export default MainPage;
