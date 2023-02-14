import React from 'react';
import UserDataContainer from './UserDataContainer';
import UserImageContainer from './UserImageContainer';
import styles from './style.module.scss';

const ProfilePage = () => (
  <div className={styles.profpageparent}>
    <UserImageContainer />
    <UserDataContainer />
  </div>
);

export default ProfilePage;
