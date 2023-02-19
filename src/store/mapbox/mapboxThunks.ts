/* eslint-disable @typescript-eslint/comma-dangle */
import { createAsyncThunk } from '@reduxjs/toolkit';
import * as mapboxTypes from './mapboxTypes';

export default createAsyncThunk<
mapboxTypes.TLocationDataResp,
number[],
{ rejectValue: mapboxTypes.TMapboxMsg }
>(
  'getLocationData',
  async (clickLocation: number[], thunkApi) => {
    console.log('MAPBOX DATA: YOU SEND LOCATION', clickLocation[0], clickLocation[1]);
    const [long, lat] = clickLocation;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${long},${lat}.json?access_token=pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ`
    );
    if (response.status !== 200) {
      return thunkApi.rejectWithValue({
        status: "We couldn't find information about this area. Please, try again later.",
      });
    }
    const data: mapboxTypes.TLocationDataResp = await response.json();
    console.log('MAPBOX DATA: YOU RECEIVE FROM SERVER', data);
    return data;
  }
);
