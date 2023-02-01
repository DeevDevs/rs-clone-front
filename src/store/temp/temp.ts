import { createSlice } from '@reduxjs/toolkit';

export const temp = createSlice({
  name: 'temp',
  initialState: {
    iterator: 1,
  },
  reducers: {
    incIterator(_state) {
      const state = _state;
      state.iterator += 1;
    },
    decIterator(_state, action) {
      const state = _state;
      state.iterator -= action.payload;
    },
  },
});

export const {
  incIterator, decIterator,
} = temp.actions;

export const selectIterator = (state: { temp: { iterator: number; }; }) => state.temp.iterator;
