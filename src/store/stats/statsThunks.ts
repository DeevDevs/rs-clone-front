import { createAsyncThunk } from '@reduxjs/toolkit';
import * as statsTypes from './statsTypes';

// const updateStats = createAsyncThunk<
//   statsTypes.TStatsResp,
//   statsTypes.TUpdStatsReq,
//   { rejectValue: statsTypes.TDBMsg }
// >('updateStats', async (updateReqBody: statsTypes.TUpdStatsReq, thunkApi) => {
//   const response = await fetch('https://rs-clone-back.herokuapp.com/api/stats', {
//     method: 'PATCH',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     credentials: 'include',
//     body: JSON.stringify(updateReqBody),
//   });
//   if (response.status !== 200) {
//     const errorMessage = await response.json();
//     return thunkApi.rejectWithValue({
//       status: errorMessage.status,
//     });
//   }
//   const data: statsTypes.TStatsResp = await response.json();
//   console.log(data);
//   return data;
// });

export const getStats = createAsyncThunk<
statsTypes.TStatsResp,
string,
{ rejectValue: statsTypes.TDBMsg }
>('getStats', async (id: string, thunkApi) => {
  // const authString = `Bearer ${cookie}`;
  const response = await fetch(`https://rs-clone-back.herokuapp.com/api/stats?id=${id}`, {
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
  const data: statsTypes.TStatsResp = await response.json();
  return data;
});

export default getStats;
