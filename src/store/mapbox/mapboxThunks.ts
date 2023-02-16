/* eslint-disable @typescript-eslint/comma-dangle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as mapboxTypes from './mapboxTypes';

// export async function getNameOfPlace(location: number[]) {
//   const [long, lat] = location;
//   const response = await fetch(
//     `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ`
//   );
//   const data = await response.json();
//   console.log(data);
// }

export const getLocationData = createAsyncThunk<
mapboxTypes.TLocationDataResp,
number[],
{ rejectValue: mapboxTypes.TMapboxMsg }
>(
  'getLocationData',
  async (clickLocation: number[], thunkApi) => {
    console.log('CLICK LOCATION', clickLocation[0], clickLocation[1]);
    const [long, lat] = clickLocation;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ`
    );
    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        status: 'Could not retrieve data about this place',
      });
    }
    const data: mapboxTypes.TLocationDataResp = await response.json();
    console.log('MAPBOX DATA: YOU RECEIVE FROM SERVER', data);
    return data;
  }
);

export async function getPlace(long: number, lat: number) {
  const response = await fetch(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json`
  );
  const data = await response.json();
  console.log(data);
}
