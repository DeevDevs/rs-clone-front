/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import * as mapboxThunks from './mapboxThunks';
import * as mapboxTypes from './mapboxTypes';

const initialState: mapboxTypes.TMapbox = {
  userLocation: [0, 0],
  clickLong: 0,
  clickLat: 0,
  country: '',
  place: '',
  mapboxMsg: '',
  clickedMemoirID: '',
  mapboxModuleMsg: '',
  clickTarget: 'map',
};

export const mapboxSlice = createSlice({
  name: 'memoir',
  initialState,
  reducers: {
    recordUserLocation(state, { payload }) {
      state.userLocation = [payload[0], payload[1]];
    },
    determineClickTarget(state, { payload }) {
      state.clickTarget = payload;
    },
    storeChosenMemoirID(state, { payload }) {
      state.clickedMemoirID = payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(
      mapboxThunks.getLocationData.fulfilled,
      (state, { payload }) => {
        const country = payload.features.find((feature) => feature.place_type.includes('country'));
        state.country = country ? country.text : 'this area';
        const place = payload.features.find((feature) => feature.place_type.includes('place'));
        state.place = place ? place.text : '';
        // eslint-disable-next-line prefer-destructuring
        state.clickLong = payload.query[0];
        // eslint-disable-next-line prefer-destructuring
        state.clickLat = payload.query[1];
        state.mapboxMsg = 'data received';
      }
    );
    builder.addCase(
      mapboxThunks.getLocationData.rejected,
      (state, { payload }) => {
        if (payload) state.mapboxMsg = payload.status;
      }
    );
    builder.addCase(mapboxThunks.getLocationData.pending, (state) => {
      state.mapboxMsg = 'Loading';
    });
  },
});

export const mapboxReducer = mapboxSlice.reducer;
export const mapboxActions = mapboxSlice.actions;
