import { createAsyncThunk } from '@reduxjs/toolkit';
import * as memoirTypes from './memoirTypes';

export const createNewMemoir = createAsyncThunk<
memoirTypes.TMemoirResp,
memoirTypes.TNewMemoirReq,
{ rejectValue: memoirTypes.TDBMsg }
>('createNewMemoir', async (newUserData: memoirTypes.TNewMemoirReq, thunkApi) => {
  const reqBody: memoirTypes.TNewMemoirReq = JSON.parse(JSON.stringify(newUserData));
  console.log('I am called', reqBody);
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/memoir/newMemoir', {
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
  const data: memoirTypes.TMemoirResp = await response.json();
  console.log(data);
  return data;
});

export const deleteMemoir = createAsyncThunk<
null,
string,
{ rejectValue: memoirTypes.TDBMsg }
>('deleteMemoir', async (id: string, thunkApi) => {
  console.log(id);
  // const authString = `Bearer ${cookie}`;
  const response = await fetch(
    `https://rs-clone-back.herokuapp.com/api/memoir/deleteMemoir?id=${id}`,
    {
      method: 'DELETE',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.status !== 204) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  return null;
});

export const getMemoir = createAsyncThunk<
memoirTypes.TMemoirResp,
string,
{ rejectValue: memoirTypes.TDBMsg }
>('getMemoir', async (id: string, thunkApi) => {
  console.log(id);
  // const authString = `Bearer ${cookie}`;
  const response = await fetch(
    `https://rs-clone-back.herokuapp.com/api/memoir/getMemoir?id=${id}`,
    {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: memoirTypes.TMemoirResp = await response.json();
  console.log(data);
  return data;
});

export const updateMemoir = createAsyncThunk<
memoirTypes.TMemoirResp,
memoirTypes.TUpdMemoirReq,
{ rejectValue: memoirTypes.TDBMsg }
>('updateMemoir', async (updateBody: memoirTypes.TUpdMemoirReq, thunkApi) => {
  console.log(updateBody.id);
  // const authString = `Bearer ${cookie}`;
  const response = await fetch(
    `https://rs-clone-back.herokuapp.com/api/memoir/updateMemoir?id=${updateBody.id}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateBody),
    },
  );
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: memoirTypes.TMemoirResp = await response.json();
  return data;
});
