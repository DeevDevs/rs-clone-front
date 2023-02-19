import React from 'react';
import UserDataContainer from './UserDataContainer';
import UserImageContainer from './UserImageContainer';
import styles from './style.module.scss';
import SensDataUpdContainer from './SensDataUpdContainer';

const ProfilePage = () => (
  <div className={styles.profpageparent}>
    <div>
      <UserImageContainer />
      <SensDataUpdContainer />
    </div>

    <UserDataContainer />
  </div>
);

export default ProfilePage;
