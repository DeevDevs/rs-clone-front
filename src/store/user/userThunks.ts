import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userTypes from './userTypes';

export const signup = createAsyncThunk<
userTypes.TSignupResponse,
userTypes.TSignup,
{ rejectValue: userTypes.TDBError }
>('signup', async (newUserData: userTypes.TSignup, thunkApi) => {
  const reqBody: userTypes.TSignup = {
    name: newUserData.name,
    email: newUserData.email,
    password: newUserData.password,
    passwordConfirm: newUserData.passwordConfirm,
  };
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/user/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(reqBody),
  });
  if (response.status !== 201) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TSignupResponse = await response.json();
  return data;
});

export const isLoggedIn = createAsyncThunk<
userTypes.TLoggedInResponse,
void,
{ rejectValue: userTypes.TDBError }
>('isloggedin', async (_, thunkApi) => {
  // const authString = `Bearer ${cookie}`;
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/user/isloggedin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.status !== 201) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TLoggedInResponse = await response.json();
  return data;
});

export const logout = createAsyncThunk<
userTypes.TLogoutResponse,
void,
{ rejectValue: userTypes.TDBError }
>('logout', async (_, thunkApi) => {
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/user/logout', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TLogoutResponse = await response.json();
  return data;
});

export const login = createAsyncThunk<
userTypes.TSignupResponse,
userTypes.TLogin,
{ rejectValue: userTypes.TDBError }
>('login', async (loginData: userTypes.TLogin, thunkApi) => {
  const reqBody: userTypes.TLogin = {
    email: loginData.email,
    password: loginData.password,
  };
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/user/login', {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(reqBody),
  });
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TSignupResponse = await response.json();
  return data;
});

export const updateUser = createAsyncThunk<
userTypes.TLoggedInResponse,
userTypes.TUpdUserReq,
{ rejectValue: userTypes.TDBError }
>('updateUser', async (userData: userTypes.TUpdUserReq, thunkApi) => {
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/user/updateUser', {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: authString,
      // Cookie: credentials.token,
    },
    body: JSON.stringify(userData),
  });
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TLoggedInResponse = await response.json();
  return data;
});

export const getUser = createAsyncThunk<
userTypes.TLoggedInResponse,
string,
{ rejectValue: userTypes.TDBError }
>('getUser', async (id, thunkApi) => {
  // const authString = `Bearer ${credentials.token}`;
  const response = await fetch(
    `https://rs-clone-back.herokuapp.com/api/user/oneUser?id=${id}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: authString,
        // Cookie: credentials.token,
      },
    },
  );
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TLoggedInResponse = await response.json();
  return data;
});
