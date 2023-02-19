import { createSlice } from '@reduxjs/toolkit';
import getLocationData from './mapboxThunks';
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
  mainMapMarkers: [],
  mapLoading: false,
  mapError: '',
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
    },
    storeMarker(state, { payload }) {
      const allMarkers = payload.filter(
        (markerPopup: mapboxTypes.TMarkerPopup | undefined) => markerPopup,
      );
      state.mainMapMarkers = [...state.mainMapMarkers, ...allMarkers];
    },
    emptyMarkers(state) {
      state.mainMapMarkers = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getLocationData.fulfilled,
      (state, { payload }) => {
        const country = payload.features.find((feature) => feature.place_type.includes('country'));
        state.country = country ? country.text : 'this area';
        const place = payload.features.find((feature) => feature.place_type.includes('place'));
        state.place = place ? place.text : '';
        // eslint-disable-next-line prefer-destructuring
        state.clickLong = payload.query[0];
        // eslint-disable-next-line prefer-destructuring
        state.clickLat = payload.query[1];
        state.mapLoading = false;
      },
    );
    builder.addCase(
      getLocationData.rejected,
      (state, { payload }) => {
        if (payload) state.mapError = payload.status;
      },
    );
    builder.addCase(getLocationData.pending, (state) => {
      state.mapLoading = true;
    });
  },
});

export const mapboxReducer = mapboxSlice.reducer;
export const mapboxActions = mapboxSlice.actions;
