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
  message: null,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunks.signup.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      console.log('Signup token:', newUser._id);
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.role = newUser.role;
      state.stateID = newUser.stateID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.token = payload.token;
      state.message = 'User signed up';
    });
    builder.addCase(userThunks.signup.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(userThunks.signup.pending, (state) => {
      state.message = 'Trying to sign up';
    });
    builder.addCase(userThunks.login.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.role = newUser.role;
      state.stateID = newUser.stateID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.token = payload.token;
      state.message = 'User logged in';
      console.log(newUser._id);
    });
    builder.addCase(userThunks.login.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(userThunks.login.pending, (state) => {
      state.message = 'Logging in';
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
      state.message = 'User logged out';
    });
    builder.addCase(userThunks.logout.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(userThunks.logout.pending, (state) => {
      state.message = 'Logging out';
    });
    builder.addCase(userThunks.isLoggedIn.fulfilled, (state, { payload }) => {
      const newUser = payload.data;
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.role = newUser.role;
      state.stateID = newUser.stateID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.message = 'User logged in';
    });
    builder.addCase(userThunks.isLoggedIn.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(userThunks.isLoggedIn.pending, (state) => {
      state.message = 'Checking if logged in';
    });
    builder.addCase(userThunks.getUser.fulfilled, (state, { payload }) => {
      state.message = 'User data received';
      console.log(payload);
    });
    builder.addCase(userThunks.getUser.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(userThunks.getUser.pending, (state) => {
      state.message = 'Getting user data';
    });
    builder.addCase(userThunks.updateUser.fulfilled, (state, { payload }) => {
      console.log('Updated user data:', payload.data);
      const userUpdateData = payload.data;
      state.name = userUpdateData.name;
      state.email = userUpdateData.email;
      state.message = 'Updated user data';
    });
    builder.addCase(userThunks.updateUser.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(userThunks.updateUser.pending, (state) => {
      state.message = 'Updating user Data';
    });
    builder.addCase(userThunks.deleteUser.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      state.photo = '';
      state.role = '';
      state.stateID = '';
      state.id = '';
      state.memoirIDs = [];
      state.token = '';
      state.message = 'Deleted a user';
    });
    builder.addCase(userThunks.deleteUser.rejected, (state, { payload }) => {
      if (payload) state.message = payload.status;
    });
    builder.addCase(userThunks.deleteUser.pending, (state) => {
      state.message = 'Deleting a user';
    });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
