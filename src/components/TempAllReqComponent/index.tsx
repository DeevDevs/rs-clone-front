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
  const { id, userMsg, statsID } = useAppSelector((state) => state.userReducer);
  const { memoirMsg } = useAppSelector((state) => state.memoirReducer);
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
    date: '2023-02-01T10:22:23.815Z',
    rateValue: 4,
    days: 7,
    sites: ['Palace', 'Market', 'Tower'],
  };

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
    days: 10,
    sites: ['Palace', 'Market'],
  };

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
      <button type="button" onClick={() => callbackCreateMemoir(tempNewMemoirData)}>
        Create Memoir
      </button>
      <button type="button" onClick={() => callbackUpdateMemoir(tempMemoirDataUpd)}>
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
    </>
  );
};

export default TestPage;
