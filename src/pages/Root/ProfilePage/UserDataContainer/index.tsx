/* eslint-disable object-curly-newline */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React, { useCallback, useEffect, useState } from 'react';
import styles from './style.module.scss';
import { useAppDispatch, useAppSelector } from '../../../../store';
import { updateUser } from '../../../../store/user/userThunks';
import * as userTypes from '../../../../store/user/userTypes';
import { countAge, saveDataToObject } from '../../../../data/ProfilePageStore';

const UserDataContainer = () => {
  const dispatchApp = useAppDispatch();
  const { id, name, age, from, bio, email } = useAppSelector(
    (state) => state.userReducer
  );
  const callbackUpdateUser = useCallback(
    async (userUpdData: userTypes.TUpdUserReq) => {
      await dispatchApp(updateUser(userUpdData));
    },
    []
  );
  const [nameUpdate, setNameUpdate] = useState(false);
  const [ageUpdate, setAgeUpdate] = useState(false);
  const [locationUpdate, setLocationUpdate] = useState(false);
  const [bioUpdate, setBioUpdate] = useState(false);
  const updateObject: userTypes.TUpdUserReq = {
    id,
  };
  const [haveChanges, setHaveChanges] = useState(false);

  useEffect(() => {
    if (!nameUpdate && !ageUpdate && !locationUpdate && !bioUpdate) {
      setHaveChanges(false);
      return;
    }
    setHaveChanges(true);
  }, [nameUpdate, ageUpdate, locationUpdate, bioUpdate]);

  return (
    <div className={styles.userdata}>
      <div className={styles.datablock}>
        <p className={styles.datablock_name}>Name:</p>
        <div className={styles.datablock_fieldbox}>
          <p
            className={`${styles.field_content} ${
              nameUpdate ? styles.hidden : ''
            }`}
          >
            {name}
          </p>
          <input
            className={`${styles.field_input} ${
              nameUpdate ? '' : styles.hidden
            }`}
            type="text"
            id="namefield"
          />
        </div>
        <button
          className={styles.datablock_button}
          type="button"
          onClick={() => {
            if (nameUpdate) {
              setNameUpdate(false);
              return;
            }
            const updatedName = document.getElementById(
              'namefield'
            ) as HTMLInputElement;
            updatedName.value = name;
            setNameUpdate(true);
          }}
        >
          {nameUpdate ? 'Cancel edit' : 'Edit'}
        </button>
      </div>
      <div className={styles.datablock}>
        <p className={styles.datablock_name}>Age:</p>
        <div className={styles.datablock_fieldbox}>
          <p
            className={`${styles.field_content} ${
              ageUpdate ? styles.hidden : ''
            }`}
          >
            {age}
          </p>
          <div className={`${styles.afb} ${ageUpdate ? '' : styles.hidden}`}>
            <p className={styles.afb_age} id="agefield">
              {age}
            </p>
            <p className={styles.afb_datename}>Birth date:</p>
            <input
              className={styles.afb_date}
              type="date"
              min="1940-01-01"
              max="2015-01-01"
              onChange={(e) => countAge(e)}
            />
          </div>
        </div>
        <button
          className={styles.datablock_button}
          type="button"
          onClick={() => {
            if (ageUpdate) {
              setAgeUpdate(false);
              return;
            }
            const updatedAge = document.getElementById(
              'agefield'
            ) as HTMLElement;
            updatedAge.textContent = `${age}`;
            setAgeUpdate(true);
          }}
        >
          {ageUpdate ? 'Cancel edit' : 'Edit'}
        </button>
      </div>
      <div className={styles.datablock}>
        <p className={styles.datablock_name}>From:</p>
        <div className={styles.datablock_fieldbox}>
          <p
            className={`${styles.field_content} ${
              locationUpdate ? styles.hidden : ''
            }`}
          >
            {from}
          </p>
          <input
            className={`${styles.field_input} ${
              locationUpdate ? '' : styles.hidden
            }`}
            type="text"
            id="locationfield"
          />
        </div>
        <button
          className={styles.datablock_button}
          type="button"
          onClick={() => {
            if (locationUpdate) {
              setLocationUpdate(false);
              return;
            }
            const updatedLocation = document.getElementById(
              'locationfield'
            ) as HTMLInputElement;
            updatedLocation.value = from;
            setLocationUpdate(true);
          }}
        >
          {locationUpdate ? 'Cancel edit' : 'Edit'}
        </button>
      </div>
      <div className={styles.datablock}>
        <p className={styles.datablock_name}>Email:</p>
        <div className={styles.datablock_fieldbox}>
          <p className={styles.field_content}>{email}</p>
          <input
            className={`${styles.field_input} ${
              nameUpdate ? '' : styles.hidden
            }`}
            type="text"
            id="emailfield"
          />
        </div>
      </div>
      <div className={styles.datablockbio}>
        <p className={styles.datablockbio_name}>Bio:</p>
        <div className={styles.datablockbio_fieldbox}>
          <p
            className={`${styles.field_biocontent} ${
              bioUpdate ? styles.hidden : ''
            }`}
          >
            {bio}
          </p>
          <textarea
            id="biofield"
            maxLength={500}
            className={`${styles.field_bioinput} ${
              bioUpdate ? '' : styles.hidden
            }`}
          />
        </div>
        <button
          className={styles.datablockbio_button}
          type="button"
          onClick={() => {
            if (bioUpdate) {
              setBioUpdate(false);
              return;
            }
            const updatedBio = document.getElementById(
              'biofield'
            ) as HTMLInputElement;
            updatedBio.value = bio;
            setBioUpdate(true);
          }}
        >
          {bioUpdate ? 'Cancel edit' : 'Edit'}
        </button>
      </div>
      <div className={styles.btnBox}>
        <button
          className={`${styles.btnBox_btn} ${
            haveChanges ? '' : styles.btn_inactive
          }`}
          type="button"
          onClick={async () => {
            if (!haveChanges) return;
            saveDataToObject(
              updateObject,
              nameUpdate,
              ageUpdate,
              locationUpdate,
              bioUpdate
            );
            await callbackUpdateUser(updateObject);
            setHaveChanges(false);
            setNameUpdate(false);
            setAgeUpdate(false);
            setLocationUpdate(false);
            setBioUpdate(false);
          }}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default UserDataContainer;
