import { createAsyncThunk } from '@reduxjs/toolkit';
import * as memoirTypes from './memoirTypes';
import { uploadMemoirImages, allFilesImages } from './memoirHelpFns';

export const createNewMemoir = createAsyncThunk<
memoirTypes.TMemoirResp,
memoirTypes.TNewMemoirReq,
{ rejectValue: memoirTypes.TDBMsg }
>('createNewMemoir', async (newMemoirData: memoirTypes.TNewMemoirReq, thunkApi) => {
  console.log('MEMOIR DATA: YOU SEND FROM COMPONENT', newMemoirData);
  const reqBody: memoirTypes.TNewMemoirReq = JSON.parse(
    JSON.stringify(newMemoirData),
  );
  const reqFiles = newMemoirData.memoirPhotos as FileList;
  const areFilesImages = allFilesImages(reqFiles);
  if (!areFilesImages) return thunkApi.rejectWithValue({ status: 'Wrong file format' });
  const imgURLs = await uploadMemoirImages(reqFiles) as string[];
  reqBody.memoirPhotos = imgURLs;
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
  console.log('MEMOIR DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const deleteMemoir = createAsyncThunk<
null,
string,
{ rejectValue: memoirTypes.TDBMsg }
>('deleteMemoir', async (id: string, thunkApi) => {
  console.log('MEMOIR DATA: YOU SEND FROM COMPONENT', id);
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
  console.log('MEMOIR DATA: YOU RECEIVE FROM SERVER', null);
  return null;
});

export const getMemoir = createAsyncThunk<
memoirTypes.TMemoirResp,
string,
{ rejectValue: memoirTypes.TDBMsg }
>('getMemoir', async (id: string, thunkApi) => {
  console.log('MEMOIR DATA: YOU SEND FROM COMPONENT', id);
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
  console.log('MEMOIR DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const updateMemoir = createAsyncThunk<
memoirTypes.TMemoirResp,
memoirTypes.TUpdMemoirReq,
{ rejectValue: memoirTypes.TDBMsg }
>('updateMemoir', async (updateBody: memoirTypes.TUpdMemoirReq, thunkApi) => {
  console.log('MEMOIR DATA: YOU SEND FROM COMPONENT', updateBody);
  const reqBody: memoirTypes.TNewMemoirReq = JSON.parse(
    JSON.stringify(updateBody),
  );
  const reqFiles = updateBody.memoirPhotos as FileList;
  const areFilesImages = allFilesImages(reqFiles);
  if (!areFilesImages) return thunkApi.rejectWithValue({ status: 'Wrong file format' });
  const imgURLs = (await uploadMemoirImages(
    reqFiles,
    true,
    updateBody.prevPhotos,
    updateBody.photosToDelete,
  )) as string[];
  reqBody.memoirPhotos = imgURLs;
  const response = await fetch(
    `https://rs-clone-back.herokuapp.com/api/memoir/updateMemoir?id=${updateBody.id}`,
    {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody),
    },
  );
  if (response.status !== 200) {
    const errorMessage = await response.json();
    return thunkApi.rejectWithValue({
      status: errorMessage.status,
    });
  }
  const data: memoirTypes.TMemoirResp = await response.json();
  console.log('MEMOIR DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});

export const getMemoirPreviews = createAsyncThunk<
memoirTypes.TPreviewsResp,
void,
{ rejectValue: memoirTypes.TDBMsg }
>('getMemoirPreviews', async (_, thunkApi) => {
  console.log('MEMOIR DATA: YOU SEND FROM COMPONENT', null);
  // const authString = `Bearer ${cookie}`;
  const response = await fetch('https://rs-clone-back.herokuapp.com/api/previews', {
    method: 'GET',
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
  const data: memoirTypes.TPreviewsResp = await response.json();
  console.log('MEMOIR DATA: YOU RECEIVE FROM SERVER', data);
  return data;
});
