import React, { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { updateUser } from '../../../../store/user/userThunks';
import * as userTypes from '../../../../store/user/userTypes';
import {
  validateEmail,
  validatePasswords,
  storeNewEmail,
  storeNewPassword,
  emptyAllFields,
} from '../../../../data/ProfilePageStore';

const SensDataUpdContainer = () => {
  const dispatchApp = useAppDispatch();
  const { id } = useAppSelector((state) => state.userReducer);
  const { userMsg } = useAppSelector((state) => state.userReducer);
  const { memoirMsg } = useAppSelector((state) => state.memoirReducer);
  const { statsMsg } = useAppSelector((state) => state.statsReducer);
  const [newEmailRdy, setNewEmailRdy] = useState(false);
  const [newPassRdy, setNewPassRdy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const callbackUpdateUser = useCallback(
    async (userUpdData: userTypes.TUpdUserReq) => {
      await dispatchApp(updateUser(userUpdData));
    },
    [],
  );
  const updateBody: userTypes.TUpdUserReq = {
    id,
  };
  useEffect(() => {
    if (
      userMsg === 'Loading'
      || memoirMsg === 'Loading'
      || statsMsg === 'Loading'
    ) {
      setIsLoading(true);
      return;
    }
    if (
      userMsg !== 'Loading'
      && memoirMsg !== 'Loading'
      && statsMsg !== 'Loading'
    ) {
      setIsLoading(false);
    }
  }, [userMsg, memoirMsg, statsMsg]);

  return (
    <div className={styles.sensdatablock}>
      <p className={styles.sensdatahead}>Update Sensitive Data</p>
      <p className={styles.sensdatasub}>
        Careful: once you update your email or password successfully, you will
        have to login again.
      </p>
      <div className={styles.field}>
        <span className={styles.field_label}>
          New email:
        </span>
        <input
          className={styles.field_input}
          type="text"
          id="newEmail"
          onChange={(e) => {
            const isValid = validateEmail(e);
            setNewEmailRdy(isValid);
          }}
        />
      </div>
      <button
        type="button"
        className={`${styles.field_btn} ${
          newEmailRdy ? '' : styles.btn_inactive
        }`}
        onClick={async () => {
          if (isLoading) return;
          if (!setNewEmailRdy) return;
          storeNewEmail(updateBody);
          await callbackUpdateUser(updateBody);
          emptyAllFields('email');
          setNewEmailRdy(false);
          toast.success('You have successfully updated your email', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
            className: 'toast-class',
          });
        }}
      >
        Update Email
      </button>
      <p className={styles.sensdatasub2}>
        Your new password must have at least one capital letter, one small
        letter, one digit and one special character.
      </p>
      <div className={styles.field}>
        <span className={styles.field_label}>
          New Password:
        </span>
        <input
          className={styles.field_input}
          type="password"
          id="newPassword"
          onChange={() => {
            validatePasswords(setNewPassRdy);
          }}
        />
      </div>
      <div className={styles.field}>
        <span className={styles.field_label}>
          Password Confirm:
        </span>
        <input
          className={styles.field_input}
          type="password"
          id="newPassConfirm"
          onChange={() => {
            validatePasswords(setNewPassRdy);
          }}
        />
      </div>
      <button
        className={`${styles.field_btn} ${
          newPassRdy ? '' : styles.btn_inactive
        }`}
        type="button"
        onClick={async () => {
          if (isLoading) return;
          if (!newPassRdy) return;
          storeNewPassword(updateBody);
          await callbackUpdateUser(updateBody);
          emptyAllFields('password');
          setNewPassRdy(false);
          toast.success('You have successfully updated your password', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
            className: 'toast-class',
          });
        }}
      >
        Update Password
      </button>
      <button
        className={`${styles.both_btn} ${
          newEmailRdy && newPassRdy ? '' : styles.btn_inactive
        }`}
        type="button"
        onClick={async () => {
          if (isLoading) return;
          if (!newPassRdy || !newEmailRdy) return;
          storeNewPassword(updateBody);
          storeNewEmail(updateBody);
          await callbackUpdateUser(updateBody);
          emptyAllFields('both');
          setNewEmailRdy(false);
          setNewPassRdy(false);
          toast.success('You have successfully updated your email and password', {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: 'light',
            className: 'toast-class',
          });
        }}
      >
        Update Email and Password
      </button>
    </div>
  );
};

export default SensDataUpdContainer;
