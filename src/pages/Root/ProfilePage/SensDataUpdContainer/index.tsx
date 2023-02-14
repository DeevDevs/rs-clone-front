/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React, { useCallback } from 'react';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { updateUser } from '../../../../store/user/userThunks';
import * as userTypes from '../../../../store/user/userTypes';

const SensDataUpdContainer = () => {
  const { id, email } = useAppSelector((state) => state.userReducer);
  const dispatchApp = useAppDispatch();
  const callbackUpdateUser = useCallback(
    async (userUpdData: userTypes.TUpdUserReq) => {
      await dispatchApp(updateUser(userUpdData));
    },
    []
  );
  const updateBody: userTypes.TUpdUserReq = {
    id,
  };

  return (
    <div className={styles.sensdatablock}>
      <p className={styles.emailblock}>
        <span className={styles.emailblock_name}>My email:</span>
        <span className={styles.emailblock_email}>{email}</span>
      </p>
      <p className={styles.sensdatahead}>Update Sensitive Data</p>
      <p className={styles.sensdatasub}>
        Careful: once you update your email or password successfully, you will
        have to login again.
      </p>
      <div className={styles.field}>
        <label className={styles.field_label} htmlFor="newEmail">
          New email:
        </label>
        <input className={styles.field_input} type="text" id="newEmail" />
      </div>
      <button
        type="button"
        className={styles.field_btn}
        onClick={() => {
          if (!updateBody.email) return;
          callbackUpdateUser(updateBody);
        }}
      >
        Update Email
      </button>
      <div className={styles.field}>
        <label className={styles.field_label} htmlFor="newPassword">
          New Password:
        </label>
        <input className={styles.field_input} type="text" id="newPassword" />
      </div>
      <div className={styles.field}>
        <label className={styles.field_label} htmlFor="newPassConfirm">
          Password Confirm:
        </label>
        <input className={styles.field_input} type="text" id="newPassConfirm" />
      </div>
      <button className={styles.field_btn} type="button">Update Password</button>
      <button className={styles.both_btn} type="button">Update Email and Password</button>
    </div>
  );
};

export default SensDataUpdContainer;
