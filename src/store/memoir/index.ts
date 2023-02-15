/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import * as memoirTypes from './memoirTypes';
import * as memoirThunks from './memoirThunks';

const initialState: memoirTypes.TMemoir = {
  id: '',
  tripName: '',
  destinationName: '',
  longLat: [],
  countryName: '',
  continentName: '',
  whereFromLongLat: [],
  distance: 0,
  date: '',
  rateValue: 0,
  days: 0,
  sites: [],
  memoirPhotos: ['default.jpg'],
  description: '',
  memoirMsg: null,
  previews: [],
};

export const memoirSlice = createSlice({
  name: 'memoir',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(memoirThunks.createNewMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      state.id = newMemoir._id;
      state.tripName = newMemoir.tripName;
      state.destinationName = newMemoir.destinationName;
      state.longLat = newMemoir.longLat;
      state.countryName = newMemoir.countryName;
      state.continentName = newMemoir.continentName;
      state.whereFromLongLat = newMemoir.whereFromLongLat;
      state.distance = newMemoir.distance;
      state.date = newMemoir.date;
      state.rateValue = newMemoir.rateValue;
      state.days = newMemoir.days;
      state.sites = newMemoir.sites;
      state.memoirPhotos = newMemoir.memoirPhotos;
      state.description = newMemoir.description;
      state.memoirMsg = 'New Memoir was created';
    });
    builder.addCase(memoirThunks.createNewMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirMsg = payload.status;
    });
    builder.addCase(memoirThunks.createNewMemoir.pending, (state) => {
      state.memoirMsg = 'Loading';
    });
    builder.addCase(memoirThunks.getMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      state.id = newMemoir._id;
      state.tripName = newMemoir.tripName;
      state.destinationName = newMemoir.destinationName;
      state.longLat = newMemoir.longLat;
      state.countryName = newMemoir.countryName;
      state.continentName = newMemoir.continentName;
      state.whereFromLongLat = newMemoir.whereFromLongLat;
      state.distance = newMemoir.distance;
      state.date = newMemoir.date;
      state.rateValue = newMemoir.rateValue;
      state.days = newMemoir.days;
      state.sites = newMemoir.sites;
      state.memoirPhotos = newMemoir.memoirPhotos;
      state.description = newMemoir.description;
      state.memoirMsg = 'A Memoir was retrieved';
    });
    builder.addCase(memoirThunks.getMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirMsg = payload.status;
    });
    builder.addCase(memoirThunks.getMemoir.pending, (state) => {
      state.memoirMsg = 'Loading';
    });
    builder.addCase(memoirThunks.deleteMemoir.fulfilled, (state) => {
      state.id = '';
      state.tripName = '';
      state.destinationName = '';
      state.longLat = [];
      state.countryName = '';
      state.continentName = '';
      state.whereFromLongLat = [];
      state.distance = 0;
      state.date = '';
      state.rateValue = 0;
      state.days = 0;
      state.sites = [];
      state.memoirPhotos = ['default.jpg'];
      state.description = '';
      state.memoirMsg = 'Memoir was deleted';
    });
    builder.addCase(memoirThunks.deleteMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirMsg = payload.status;
    });
    builder.addCase(memoirThunks.deleteMemoir.pending, (state) => {
      state.memoirMsg = 'Loading';
    });
    builder.addCase(memoirThunks.updateMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      state.id = newMemoir._id;
      state.tripName = newMemoir.tripName;
      state.destinationName = newMemoir.destinationName;
      state.longLat = newMemoir.longLat;
      state.countryName = newMemoir.countryName;
      state.continentName = newMemoir.continentName;
      state.whereFromLongLat = newMemoir.whereFromLongLat;
      state.distance = newMemoir.distance;
      state.date = newMemoir.date;
      state.rateValue = newMemoir.rateValue;
      state.days = newMemoir.days;
      state.sites = newMemoir.sites;
      state.memoirPhotos = newMemoir.memoirPhotos;
      state.description = newMemoir.description;
      state.memoirMsg = 'A Memoir was updated';
    });
    builder.addCase(memoirThunks.updateMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirMsg = payload.status;
    });
    builder.addCase(memoirThunks.updateMemoir.pending, (state) => {
      state.memoirMsg = 'Loading';
    });
    builder.addCase(memoirThunks.getMemoirPreviews.fulfilled, (state, { payload }) => {
      const previews: memoirTypes.TMemoirPreview[] = payload.data;
      state.previews = previews;
      state.memoirMsg = 'Previews were retrieved';
    });
    builder.addCase(memoirThunks.getMemoirPreviews.rejected, (state, { payload }) => {
      if (payload) state.memoirMsg = payload.status;
    });
    builder.addCase(memoirThunks.getMemoirPreviews.pending, (state) => {
      state.memoirMsg = 'Loading';
    });
  },
});

export const memoirReducer = memoirSlice.reducer;
export const memoirActions = memoirSlice.actions;
