import React, { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/index';
import {
  signup,
  isLoggedIn,
  logout,
  login,
  getUser,
  updateUser,
  deleteUser,
  addProfileImage,
} from '../../store/user/userThunks';
import {
  createNewMemoir,
  deleteMemoir,
  getMemoir,
  updateMemoir,
  getMemoirPreviews,
} from '../../store/memoir/memoirThunks';
// eslint-disable-next-line import/no-named-as-default
import getStats from '../../store/stats/statsThunks';
import * as userTypes from '../../store/user/userTypes';
import * as memoirTypes from '../../store/memoir/memoirTypes';
// import * as statsTypes from '../../store/stats/statsTypes';

const TestPage = () => {
  const {
    id,
    userMsg,
    statsID,
    photo,
  } = useAppSelector((state) => state.userReducer);
  const { memoirMsg, memoirPhotos } = useAppSelector((state) => state.memoirReducer);
  const lastMemoirID = useAppSelector((state) => state.memoirReducer).id;
  const { statsMsg } = useAppSelector((state) => state.statsReducer);

  const dispatchApp = useAppDispatch();
  const callbackSignup = useCallback(async (userData: userTypes.TSignupReq) => {
    await dispatchApp(signup(userData));
  }, []);
  const callbackIsLoggedIn = useCallback(async () => {
    await dispatchApp(isLoggedIn());
  }, []);
  const callbackLogout = useCallback(async () => {
    await dispatchApp(logout());
  }, []);
  const callbackLogin = useCallback(async (loginData: userTypes.TLoginReq) => {
    await dispatchApp(login(loginData));
  }, []);
  const callbackGetUser = useCallback(async (userId: string) => {
    await dispatchApp(getUser(userId));
  }, []);
  const callbackDeleteUser = useCallback(async (userId: string) => {
    await dispatchApp(deleteUser(userId));
  }, []);
  const callbackUpdateUser = useCallback(async (userUpdData: userTypes.TUpdUserReq) => {
    await dispatchApp(updateUser(userUpdData));
  }, []);
  const callbackAddProfImage = useCallback(async (updData: userTypes.TUploadImgReq) => {
    await dispatchApp(addProfileImage(updData));
  }, []);
  const callbackCreateMemoir = useCallback(async (memoirData: memoirTypes.TNewMemoirReq) => {
    await dispatchApp(createNewMemoir(memoirData));
  }, []);
  const callbackDeleteMemoir = useCallback(async (memoirId: string) => {
    await dispatchApp(deleteMemoir(memoirId));
  }, []);
  const callbackGetMemoir = useCallback(async (memoirId: string) => {
    await dispatchApp(getMemoir(memoirId));
  }, []);
  const callbackGetMemoirPreviews = useCallback(async () => {
    await dispatchApp(getMemoirPreviews());
  }, []);
  const callbackUpdateMemoir = useCallback(async (memoirData: memoirTypes.TUpdMemoirReq) => {
    await dispatchApp(updateMemoir(memoirData));
  }, []);
  const callbackGetStats = useCallback(async (userStatsID: string) => {
    await dispatchApp(getStats(userStatsID));
  }, []);
  // const callbackUpdateStats = useCallback(async (statsUpdData: statsTypes.TUpdStatsReq) => {
  //   await dispatchApp(updateStats(statsUpdData));
  // }, []);

  useEffect(() => {
    console.log(userMsg);
  }, [userMsg]);

  useEffect(() => {
    console.log(memoirMsg);
  }, [memoirMsg]);

  useEffect(() => {
    console.log(statsMsg);
  }, [statsMsg]);

  const tempUserDataUpd = {
    id,
    name: 'Valera Pistol',
    bio: 'Lorem ipsum abrakadabra',
    age: 99,
    from: 'China',
  };

  const tempNewMemoirData = {
    tripName: 'Lonesome October',
    destinationName: 'Tashkent',
    longLat: [23.090029, 105.399203],
    countryName: 'Uzb',
    continentName: 'Asia',
    whereFromLongLat: [23.090029, 100.399203],
    distance: 239,
    memoirPhotos: [],
    date: '2023-02-01T10:22:23.815Z',
    rateValue: 4,
    days: 7,
    sites: ['Palace', 'Market', 'Tower'],
  } as memoirTypes.TNewMemoirReq;

  const tempMemoirDataUpd = {
    id: lastMemoirID,
    tripName: 'Lonesome November',
    destinationName: 'Beijing',
    longLat: [23.090029, 105.399203],
    countryName: 'China',
    continentName: 'Europe',
    whereFromLongLat: [23.090029, 100.399203],
    distance: 239,
    date: '2023-02-01T10:22:23.815Z',
    rateValue: 9,
    prevPhotos: memoirPhotos,
    photosToDelete: [memoirPhotos[0]],
    memoirPhotos: [],
    days: 10,
    sites: ['Palace', 'Market'],
  } as memoirTypes.TUpdMemoirReq;

  // const tempIDsUpdStats = {
  //   statsID,
  //   memoirID: lastMemoirID,
  //   condition: 'add',
  // };

  // const tempIDsUpdStatsToDelete = {
  //   statsID,
  //   memoirID: lastMemoirID,
  //   condition: 'remove',
  // };

  return (
    <>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          const userData = {
            name: 'William Shake',
            email: 'dfgfht@fgdf.com',
            password: '23423423434',
            passwordConfirm: '23423423434',
          };
          callbackSignup(userData);
        }}
      >
        Signup
      </button>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          const loginData = {
            email: 'dfgfht@fgdf.com',
            password: '23423423434',
          };
          callbackLogin(loginData);
        }}
      >
        Login
      </button>
      <button type="button" onClick={() => callbackIsLoggedIn()}>
        IsLoggedIn
      </button>
      <button type="button" onClick={() => callbackLogout()}>
        Logout
      </button>
      <br />
      <br />
      <button type="button" onClick={() => callbackGetUser(id)}>
        Get User
      </button>
      <button type="button" onClick={() => callbackDeleteUser(id)}>
        Delete User
      </button>
      <button type="button" onClick={() => callbackUpdateUser(tempUserDataUpd)}>
        Update User
      </button>
      <button type="button" onClick={() => callbackGetMemoirPreviews()}>
        Get Memoir Previews
      </button>
      <br />
      <br />
      <p>
        Чтобы добавить аватарку пользователю, добавьте фотку с помощью Choose
        File, а затем нажмите Add User Avatar
      </p>
      <div>
        <button
          type="button"
          onClick={async () => {
            console.log('BtnFnCalled');
            const inputField = document.getElementById(
              'file-upload',
            ) as HTMLInputElement;
            if (inputField.files) {
              const updBody = {
                id,
                files: inputField.files,
              };
              callbackAddProfImage(updBody);
            }
          }}
        >
          Add User Avatar
        </button>
        <input id="file-upload" type="file" />
        <img src={photo} alt="" />
      </div>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          console.log(tempNewMemoirData);
          callbackCreateMemoir(tempNewMemoirData);
        }}
      >
        Create Memoir
      </button>
      <button
        type="button"
        onClick={() => callbackUpdateMemoir(tempMemoirDataUpd)}
      >
        Update Last Memoir
      </button>
      {/* <button type="button" onClick={() => callbackUpdateStats(tempIDsUpdStats)}>
        Update Stats After Creating or Updating a Memoir (MUST)
      </button> */}
      <br />
      <br />
      {/* <button type="button" onClick={() => callbackUpdateStats(tempIDsUpdStatsToDelete)}>
        Also Update Stats BEFORE Deleting a Memoir (MUST)
      </button> */}
      <button type="button" onClick={() => callbackDeleteMemoir(lastMemoirID)}>
        Delete Last Memoir
      </button>
      <br />
      <br />
      <button type="button" onClick={() => callbackGetMemoir(lastMemoirID)}>
        Get Last Memoir
      </button>
      <br />
      <br />
      <button type="button" onClick={() => callbackGetStats(statsID)}>
        Get User Stats
      </button>
      <br />
      <br />
      <p>
        Если хотите создать мемуар с фотографиями, добавьте фотографии с помощью
        Choose Files ниже, а затем нажмите Add Images to Memoir Object. Только
        после этого можно нажать Create Memoir.
      </p>
      <p>
        Если хотите добавить в мемуар новые фотографии, добавьте фотографии с
        помощью Choose Files ниже, а затем нажмите Add Images to Memoir Update
        Object. Только после этого можно нажать Update Last Memoir.
      </p>
      <div>
        <button
          type="button"
          onClick={async () => {
            const inputField = document.getElementById(
              'file-upload2',
            ) as HTMLInputElement;
            if (inputField.files) {
              tempNewMemoirData.memoirPhotos = inputField.files;
            }
          }}
        >
          Add Image to Memoir Object
        </button>
        <button
          type="button"
          onClick={async () => {
            const inputField = document.getElementById(
              'file-upload2',
            ) as HTMLInputElement;
            if (inputField.files) {
              tempMemoirDataUpd.memoirPhotos = inputField.files;
            }
          }}
        >
          Add Image to Memoir Update Object
        </button>
        <input id="file-upload2" type="file" multiple />
        {/* <img src={photo} alt="" /> */}
      </div>
    </>
  );
};

export default TestPage;
