import { createAsyncThunk } from '@reduxjs/toolkit';
import * as userTypes from './userTypes';

export const signup = createAsyncThunk<
userTypes.TSignupResp,
userTypes.TSignupReq,
{ rejectValue: userTypes.TDBMsg }
>('signup', async (newUserData: userTypes.TSignupReq, thunkApi) => {
  console.log('USER DATA: YOU SEND FROM COMPONENT', newUserData);
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
  console.log('USER DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const isLoggedIn = createAsyncThunk<
userTypes.TUserDataResp,
void,
{ rejectValue: userTypes.TDBMsg }
>('isloggedin', async (_, thunkApi) => {
  console.log('USER DATA: YOU SEND FROM COMPONENT', null);
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
  console.log('USER DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const logout = createAsyncThunk<
userTypes.TLogoutResp,
void,
{ rejectValue: userTypes.TDBMsg }
>('logout', async (_, thunkApi) => {
  console.log('USER DATA: YOU SEND FROM COMPONENT', null);
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
  console.log('USER DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const login = createAsyncThunk<
userTypes.TSignupResp,
userTypes.TLoginReq,
{ rejectValue: userTypes.TDBMsg }
>('login', async (loginData: userTypes.TLoginReq, thunkApi) => {
  console.log('USER DATA: YOU SEND FROM COMPONENT', loginData);
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
  console.log('USER DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const updateUser = createAsyncThunk<
userTypes.TUserDataResp,
userTypes.TUpdUserReq,
{ rejectValue: userTypes.TDBMsg }
>('updateUser', async (userData: userTypes.TUpdUserReq, thunkApi) => {
  console.log('USER DATA: YOU SEND FROM COMPONENT', userData);
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
  console.log('USER DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const getUser = createAsyncThunk<
userTypes.TUserDataResp,
string,
{ rejectValue: userTypes.TDBMsg }
>('getUser', async (id, thunkApi) => {
  // const authString = `Bearer ${credentials.token}`;
  console.log('USER DATA: YOU SEND FROM COMPONENT', id);
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
  console.log('USER DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const deleteUser = createAsyncThunk<
null,
string,
{ rejectValue: userTypes.TDBMsg }
>('deleteUser', async (id, thunkApi) => {
  console.log('USER DATA: YOU SEND FROM COMPONENT', id);
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
  console.log('USER DATA: YOU RECEIVE FROM SERVER', null);
  return null;
});

export const addProfileImage = createAsyncThunk<
userTypes.TUserDataResp,
userTypes.TUploadImgReq,
{ rejectValue: userTypes.TDBMsg }
>('addProfileImage', async (updData: userTypes.TUploadImgReq, thunkApi) => {
  console.log('USER DATA: YOU SEND FROM COMPONENT', updData);
  const file = updData.files[0] as File;
  if (!file) return thunkApi.rejectWithValue({ status: 'Uploading interrupted. File not found' });
  if (
    !file.name.endsWith('png')
    && !file.name.endsWith('jpg')
    && !file.name.endsWith('webp')
  ) return thunkApi.rejectWithValue({ status: 'Wrong file format' });
  const formData = new FormData();
  formData.set('set', '20130477ec7d5485cba138eb19349cbe');
  formData.append('image', file);
  const imgBBresponse = await fetch(
    'https://api.imgbb.com/1/upload?expiration=5000&key=20130477ec7d5485cba138eb19349cbe',
    {
      method: 'POST',
      body: formData,
    },
  );
  if (imgBBresponse.status !== 200) {
    return thunkApi.rejectWithValue({
      status: 'Could not upload your image. Please, try again later',
    });
  }
  const imageData: userTypes.TImgBBResp = await imgBBresponse.json();
  const imgUpdateBody = {
    id: updData.id,
    photo: imageData.data.url,
  };
  const response = await fetch(
    'https://rs-clone-back.herokuapp.com/api/user/updateUser',
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: authString,
        // Cookie: credentials.token,
      },
      body: JSON.stringify(imgUpdateBody),
    },
  );
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: userTypes.TUserDataResp = await response.json();
  console.log('USER DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});
