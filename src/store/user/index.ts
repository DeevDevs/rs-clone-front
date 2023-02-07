/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
import { createSlice } from '@reduxjs/toolkit';
import * as userTypes from './userTypes';
import * as userThunks from './userThunks';

const initialState: userTypes.TUser = {
  id: '',
  name: 'Whatever',
  email: '',
  photo: '',
  role: '',
  stateID: '',
  memoirIDs: [],
  error: null,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunks.signup.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      console.log(payload.token);
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.role = newUser.role;
      state.stateID = newUser.stateID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.token = payload.token;
    });
    builder.addCase(userThunks.signup.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
    });
    builder.addCase(userThunks.signup.pending, (state) => {
      state.error = {
        status: 'loading',
      };
    });
    builder.addCase(userThunks.login.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      console.log(payload.token);
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.role = newUser.role;
      state.stateID = newUser.stateID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.token = payload.token;
    });
    builder.addCase(userThunks.login.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
    });
    builder.addCase(userThunks.login.pending, (state) => {
      state.error = {
        status: 'loading',
      };
    });
    builder.addCase(userThunks.logout.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      state.photo = '';
      state.role = '';
      state.stateID = '';
      state.id = '';
      state.memoirIDs = [];
      state.token = '';
    });
    builder.addCase(userThunks.logout.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
    });
    builder.addCase(userThunks.logout.pending, (state) => {
      state.error = {
        status: 'loading',
      };
    });
    builder.addCase(userThunks.getUser.fulfilled, (state, { payload }) => {
      console.log(payload);
    });
    builder.addCase(userThunks.getUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
    });
    builder.addCase(userThunks.getUser.pending, (state) => {
      state.error = {
        status: 'loading',
      };
    });
    builder.addCase(userThunks.updateUser.fulfilled, (state, { payload }) => {
      console.log(payload.data);
      const userUpdateData = payload.data;
      state.name = userUpdateData.name;
      state.email = userUpdateData.email;
    });
    builder.addCase(userThunks.updateUser.rejected, (state, { payload }) => {
      if (payload) state.error = payload;
    });
    builder.addCase(userThunks.updateUser.pending, (state) => {
      state.error = {
        status: 'loading',
      };
    });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
