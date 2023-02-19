/* eslint-disable no-confusing-arrow */
import React, { useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './style.module.scss';
import { PagePath } from '../../../enums';
import { useAppDispatch, useAppSelector } from '../../../store';
import { isLoggedIn } from '../../../store/user/userThunks';
import { getMemoirPreviews } from '../../../store/memoir/memoirThunks';
import UserBlock from './UserBlock';

const Header = () => {
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
    <header className={styles.header}>
      <h1 className={styles.header__text}>
        Travel the world... travel the life!
      </h1>
      <div className={styles.links}>
        <NavLink
          to={PagePath.Root}
          className={({ isActive }) => isActive ? styles.button_active : styles.button}
        >
          Home
        </NavLink>
        <NavLink
          to={PagePath.Offers}
          className={({ isActive }) => isActive ? styles.button_active : styles.button}
        >
          Offers
        </NavLink>
        <UserBlock />
      </div>
    </header>
  );
};

export default Header;
