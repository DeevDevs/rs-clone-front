import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import toastSettings from '../constants';
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
  statsLoading: false,
  statsError: '',
};

export const statsSlice = createSlice({
  name: 'stats',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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
      state.statsLoading = false;
    });
    builder.addCase(statsThunks.getStats.rejected, (state, { payload }) => {
      if (payload) state.statsError = payload.status;
      toast.error(`${state.statsError}. Please, try again later.`, { ...toastSettings });
      state.statsLoading = false;
    });
    builder.addCase(statsThunks.getStats.pending, (state) => {
      state.statsLoading = true;
    });
  },
});

export const statsReducer = statsSlice.reducer;
export const statsActions = statsSlice.actions;
