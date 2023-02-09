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
  memoirPhoto: '',
  description: '',
  message: null,
  previews: [],
};

export const memoirSlice = createSlice({
  name: 'memoir',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(memoirThunks.createNewMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      console.log(newMemoir._id);
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
      state.memoirPhoto = newMemoir.memoirPhoto;
      state.description = newMemoir.description;
      state.message = 'New Memoir was created';
    });
    builder.addCase(memoirThunks.createNewMemoir.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(memoirThunks.createNewMemoir.pending, (state) => {
      state.message = 'Creating a memoir';
    });
    builder.addCase(memoirThunks.getMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      console.log(newMemoir._id);
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
      state.memoirPhoto = newMemoir.memoirPhoto;
      state.description = newMemoir.description;
      state.message = 'A Memoir was retrieved';
    });
    builder.addCase(memoirThunks.getMemoir.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(memoirThunks.getMemoir.pending, (state) => {
      state.message = 'Retrieving a memoir';
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
      state.memoirPhoto = '';
      state.description = '';
      state.message = 'Memoir was deleted';
    });
    builder.addCase(memoirThunks.deleteMemoir.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(memoirThunks.deleteMemoir.pending, (state) => {
      state.message = 'Deleting a memoir';
    });
    builder.addCase(memoirThunks.updateMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      console.log(newMemoir._id);
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
      state.memoirPhoto = newMemoir.memoirPhoto;
      state.description = newMemoir.description;
      state.message = 'A Memoir was updated';
    });
    builder.addCase(memoirThunks.updateMemoir.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(memoirThunks.updateMemoir.pending, (state) => {
      state.message = 'Updating a memoir';
    });
    builder.addCase(memoirThunks.getMemoirPreviews.fulfilled, (state, { payload }) => {
      const previews: memoirTypes.TMemoirPreview[] = payload.data;
      console.log(previews);
      state.previews = previews;
      state.message = 'Previews were retrieved';
    });
    builder.addCase(memoirThunks.getMemoirPreviews.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(memoirThunks.getMemoirPreviews.pending, (state) => {
      state.message = 'Getting previews';
    });
  },
});

export const memoirReducer = memoirSlice.reducer;
export const memoirActions = memoirSlice.actions;
