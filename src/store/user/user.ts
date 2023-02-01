import { createSlice } from '@reduxjs/toolkit';

export const user = createSlice({
  name: 'user',
  initialState: {
    name: 'Andrew',
  },
  reducers: {
    setName(_state, { payload }) {
      const state = _state;
      state.name = payload;
    },
  },
});

export const {
  setName,
} = user.actions;

export const selectName = (state: { user: { name: string; }; }) => state.user.name;
