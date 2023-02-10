/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import * as statsTypes from './statsTypes';
import * as statsThunks from './statsThunks';

const initialState: statsTypes.TStats = {
  id: '',
  places: 0,
  days: 0,
  averageRate: 0,
  distance: 0,
  sites: [],
  countries: [],
  continents: [],
  statsMsg: null,
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // builder.addCase(statsThunks.updateStats.fulfilled, (state, { payload }) => {
    //   const newStats: statsTypes.TDBStats = payload.data;
    //   console.log(newStats._id);
    //   state.id = newStats._id;
    //   state.places = newStats.places;
    //   state.days = newStats.days;
    //   state.averageRate = newStats.averageRate;
    //   state.distance = newStats.distance;
    //   state.sites = JSON.parse(JSON.stringify(newStats.sites));
    //   state.countries = JSON.parse(JSON.stringify(newStats.countries));
    //   state.continents = JSON.parse(JSON.stringify(newStats.continents));
    //   state.statsMsg = 'Stats were updated';
    // });
    // builder.addCase(statsThunks.updateStats.rejected, (state, { payload }) => {
    //   if (payload) state.statsMsg = payload.status;
    // });
    // builder.addCase(statsThunks.updateStats.pending, (state) => {
    //   state.statsMsg = 'Updating stats';
    // });
    builder.addCase(statsThunks.getStats.fulfilled, (state, { payload }) => {
      const newStats: statsTypes.TDBStats = payload.data;
      state.id = newStats._id;
      state.places = newStats.places;
      state.days = newStats.days;
      state.averageRate = newStats.averageRate;
      state.distance = newStats.distance;
      state.sites = JSON.parse(JSON.stringify(newStats.sites));
      state.countries = JSON.parse(JSON.stringify(newStats.countries));
      state.continents = JSON.parse(JSON.stringify(newStats.continents));
      state.statsMsg = 'Stats were got';
    });
    builder.addCase(statsThunks.getStats.rejected, (state, { payload }) => {
      if (payload) state.statsMsg = payload.status;
    });
    builder.addCase(statsThunks.getStats.pending, (state) => {
      state.statsMsg = 'Getting stats';
    });
  },
});

export const statsReducer = statsSlice.reducer;
export const statsActions = statsSlice.actions;
