/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-confusing-arrow */
import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './style.module.scss';
import { PagePath } from '../../../../enums';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { logout } from '../../../../store/user/userThunks';

const UserBlock = () => {
  const navigate = useNavigate();
  const { id, name, photo } = useAppSelector((state) => state.userReducer);
  const dispatchApp = useAppDispatch();
  const callbackLogout = useCallback(async () => {
    await dispatchApp(logout());
  }, []);

  return (
    <div
      className={styles.user}
      onMouseLeave={() => {
        const dropDown = document.getElementById('dropDownMenu');
        if (!dropDown?.classList.contains('hiddenMenu')) dropDown?.classList.toggle('hiddenMenu');
      }}
    >
      <span
        className={styles.user__name}
        onClick={() => {
          if (!id) return;
          const dropDown = document.getElementById('dropDownMenu');
          dropDown?.classList.toggle('hiddenMenu');
        }}
      >
        {id ? name : 'Friendly Guest'}
      </span>
      <img className={styles.user__img} alt="user-img" src={photo} />
      <div className={`${styles.dropdown} hiddenMenu`} id="dropDownMenu">
        <button
          type="button"
          className={styles.dropdown_item}
          onClick={() => {
            if (!id) return;
            navigate(PagePath.Profile);
          }}
        >
          View profile
        </button>
        <button
          type="button"
          className={styles.dropdown_item}
          onClick={() => {
            if (!id) return;
            callbackLogout();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default UserBlock;
