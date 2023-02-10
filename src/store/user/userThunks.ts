import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userTypes from './userTypes';

export const signup = createAsyncThunk<
userTypes.TSignupResp,
userTypes.TSignupReq,
{ rejectValue: userTypes.TDBMsg }
>('signup', async (newUserData: userTypes.TSignupReq, thunkApi) => {
  const reqBody: userTypes.TSignupReq = {
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
  const data: userTypes.TSignupResp = await response.json();
  return data;
});

export const isLoggedIn = createAsyncThunk<
userTypes.TUserDataResp,
void,
{ rejectValue: userTypes.TDBMsg }
>('isloggedin', async (_, thunkApi) => {
  // const authString = `Bearer ${cookie}`;
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/user/isloggedin', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TUserDataResp = await response.json();
  return data;
});

export const logout = createAsyncThunk<
userTypes.TLogoutResp,
void,
{ rejectValue: userTypes.TDBMsg }
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
  const data: userTypes.TLogoutResp = await response.json();
  return data;
});

export const login = createAsyncThunk<
userTypes.TSignupResp,
userTypes.TLoginReq,
{ rejectValue: userTypes.TDBMsg }
>('login', async (loginData: userTypes.TLoginReq, thunkApi) => {
  const reqBody: userTypes.TLoginReq = {
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
  const data: userTypes.TSignupResp = await response.json();
  return data;
});

export const updateUser = createAsyncThunk<
userTypes.TUserDataResp,
userTypes.TUpdUserReq,
{ rejectValue: userTypes.TDBMsg }
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
  const data: userTypes.TUserDataResp = await response.json();
  return data;
});

export const getUser = createAsyncThunk<
userTypes.TUserDataResp,
string,
{ rejectValue: userTypes.TDBMsg }
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
  const data: userTypes.TUserDataResp = await response.json();
  return data;
});

export const deleteUser = createAsyncThunk<
null,
string,
{ rejectValue: userTypes.TDBMsg }
>('deleteUser', async (id, thunkApi) => {
  // const authString = `Bearer ${credentials.token}`;
  const response = await fetch(`https://rs-clone-back.herokuapp.com/api/user/deleteUser?id=${id}`, {
    method: 'DELETE',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      // Authorization: authString,
      // Cookie: credentials.token,
    },
  });
  if (response.status !== 204) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  return null;
});
