import React, { useCallback, useState } from 'react';
import styles from './style.module.scss';
import { useAppSelector, useAppDispatch } from '../../../../store';
import { addProfileImage } from '../../../../store/user/userThunks';
import * as userTypes from '../../../../store/user/userTypes';

const UserImageContainer = () => {
  const dispatchApp = useAppDispatch();
  const [photoPreview, setPhotoPreview] = useState('');
  const { photo, id } = useAppSelector((state) => state.userReducer);
  const [isImgAdded, setIsImgAdded] = useState(false);
  const callbackAddProfImage = useCallback(
    async (updData: userTypes.TUploadImgReq) => {
      await dispatchApp(addProfileImage(updData));
    },
    [],
  );
  return (
    <div className={styles.userimgblock}>
      <div
        className={styles.userimg}
        style={{ backgroundImage: `url(${photoPreview || photo})` }}
      />
      <div className={styles.toolbox}>
        <button
          className={`${styles.toolbox_btn} ${
            isImgAdded ? '' : styles.btn_inactive
          }`}
          type="button"
          onClick={async () => {
            if (!isImgAdded) return;
            const inputField = document.getElementById(
              'img-upload',
            ) as HTMLInputElement;
            if (inputField.files) {
              const updBody = {
                id,
                files: inputField.files,
              };
              callbackAddProfImage(updBody);
              setIsImgAdded(false);
            }
          }}
        >
          Update Image
        </button>
        <label htmlFor="img-upload" className={styles.toolbox_btn}>
          {isImgAdded ? 'Image Chosen' : 'Choose Image'}
        </label>
        <input
          className={styles.toolbox_input}
          id="img-upload"
          type="file"
          onChange={(e) => {
            const filelist = e.target.files as FileList;
            if (filelist.length > 0) {
              const reader = new FileReader();
              reader.readAsDataURL(filelist[0]);
              reader.addEventListener('load', () => {
                const { result } = reader;
                if (typeof result === 'string') {
                  setPhotoPreview(result);
                }
              });
              setIsImgAdded(true);
            }
          }}
        />
      </div>
    </div>
  );
};

export default UserImageContainer;
