import React from 'react';
import UserDataContainer from './UserDataContainer';
import UserImageContainer from './UserImageContainer';
import styles from './style.module.scss';
import SensDataUpdContainer from './SensDataUpdContainer';
import BlockPageComp from '../../../components/BlockPageComp';
import { useAppSelector } from '../../../store';

const ProfilePage = () => {
  const { id } = useAppSelector((state) => state.userReducer);
  return (
    <div className={styles.profPage}>
      {id
        ? (
          <div className={styles.profpageparent}>
            <div>
              <UserImageContainer />
              <SensDataUpdContainer />
            </div>
            <UserDataContainer />
          </div>
        )
        : <BlockPageComp />}
    </div>
  );
};

export default ProfilePage;
