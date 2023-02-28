import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import toastSettings from '../constants';
import * as memoirTypes from './memoirTypes';
import * as memoirThunks from './memoirThunks';
import { updateMemoirState, emptyMemoirState } from './memoirHelpFns';

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
  memoirPhotos: ['https://i.ibb.co/XWyGkgv/default-trip-img.jpg'],
  description: '',
  memoirMsg: null,
  previews: [],
  memoirLoading: false,
  memoirError: '',
};

export const memoirSlice = createSlice({
  name: 'memoir',
  initialState,
  reducers: {
    addDataFromMapClick(state, { payload }) {
      state.longLat = state.longLat.map((value, index) => payload.longLat[index]);
      if (payload.destinationName) state.destinationName = payload.destinationName;
      if (payload.countryName) state.countryName = payload.countryName;
    },
    emptyPreviews(state) {
      state.previews = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(memoirThunks.createNewMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      updateMemoirState(state, newMemoir);
      state.memoirLoading = false;
      toast.info('Great, we have a new memoir!', { ...toastSettings });
    });
    builder.addCase(memoirThunks.createNewMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirError = payload.status;
      toast.error(`${state.memoirError}`, { ...toastSettings });
      state.memoirLoading = false;
    });
    builder.addCase(memoirThunks.createNewMemoir.pending, (state) => {
      state.memoirLoading = true;
    });
    builder.addCase(memoirThunks.getMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      updateMemoirState(state, newMemoir);
      state.memoirLoading = false;
    });
    builder.addCase(memoirThunks.getMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirError = payload.status;
      toast.error(`${state.memoirError}`, { ...toastSettings });
      state.memoirLoading = false;
    });
    builder.addCase(memoirThunks.getMemoir.pending, (state) => {
      state.memoirLoading = true;
    });
    builder.addCase(memoirThunks.deleteMemoir.fulfilled, (state) => {
      emptyMemoirState(state);
      state.memoirLoading = false;
      toast.info('You have deleted a memoir!', { ...toastSettings });
    });
    builder.addCase(memoirThunks.deleteMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirError = payload.status;
      toast.error(`${state.memoirError}`, { ...toastSettings });
      state.memoirLoading = false;
    });
    builder.addCase(memoirThunks.deleteMemoir.pending, (state) => {
      state.memoirLoading = true;
    });
    builder.addCase(memoirThunks.updateMemoir.fulfilled, (state, { payload }) => {
      const newMemoir: memoirTypes.TDBMemoir = payload.data;
      updateMemoirState(state, newMemoir);
      state.memoirLoading = false;
      toast.info('You have updated a memoir!', { ...toastSettings });
    });
    builder.addCase(memoirThunks.updateMemoir.rejected, (state, { payload }) => {
      if (payload) state.memoirError = payload.status;
      toast.error(`${state.memoirError}`, { ...toastSettings });
      state.memoirLoading = false;
    });
    builder.addCase(memoirThunks.updateMemoir.pending, (state) => {
      state.memoirLoading = true;
    });
    builder.addCase(memoirThunks.getMemoirPreviews.fulfilled, (state, { payload }) => {
      const previews: memoirTypes.TMemoirPreview[] = payload.data;
      state.previews = previews;
      state.memoirLoading = false;
    });
    builder.addCase(memoirThunks.getMemoirPreviews.rejected, (state, { payload }) => {
      if (payload) state.memoirError = payload.status;
      toast.error(`${state.memoirError}`, { ...toastSettings });
      state.memoirLoading = false;
    });
    builder.addCase(memoirThunks.getMemoirPreviews.pending, (state) => {
      state.memoirLoading = true;
    });
  },
});

export const memoirReducer = memoirSlice.reducer;
export const memoirActions = memoirSlice.actions;
