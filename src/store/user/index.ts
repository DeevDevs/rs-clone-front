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
  age: 0,
  from: '',
  bio: '',
  statsID: '',
  memoirIDs: [],
  userMsg: null,
  token: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunks.signup.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.age = newUser.age;
      state.from = newUser.from;
      state.bio = newUser.bio;
      state.statsID = newUser.statsID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.token = payload.token;
      state.userMsg = 'User signed up';
    });
    builder.addCase(userThunks.signup.rejected, (state, { payload }) => {
      if (payload) state.userMsg = payload.status;
    });
    builder.addCase(userThunks.signup.pending, (state) => {
      state.userMsg = 'Trying to sign up';
    });
    builder.addCase(userThunks.login.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.age = newUser.age;
      state.from = newUser.from;
      state.bio = newUser.bio;
      state.statsID = newUser.statsID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.token = payload.token;
      state.userMsg = 'User logged in';
    });
    builder.addCase(userThunks.login.rejected, (state, { payload }) => {
      if (payload) state.userMsg = payload.status;
    });
    builder.addCase(userThunks.login.pending, (state) => {
      state.userMsg = 'Logging in';
    });
    builder.addCase(userThunks.logout.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      state.photo = '';
      state.age = 0;
      state.from = '';
      state.bio = '';
      state.statsID = '';
      state.id = '';
      state.memoirIDs = [];
      state.token = '';
      state.userMsg = 'User logged out';
    });
    builder.addCase(userThunks.logout.rejected, (state, { payload }) => {
      if (payload) state.userMsg = payload.status;
    });
    builder.addCase(userThunks.logout.pending, (state) => {
      state.userMsg = 'Logging out';
    });
    builder.addCase(userThunks.isLoggedIn.fulfilled, (state, { payload }) => {
      const newUser = payload.data;
      state.name = newUser.name;
      state.email = newUser.email;
      state.photo = newUser.photo;
      state.age = newUser.age;
      state.from = newUser.from;
      state.bio = newUser.bio;
      state.statsID = newUser.statsID;
      state.id = newUser._id;
      state.memoirIDs = newUser.memoirIDs.slice();
      state.userMsg = 'User logged in';
    });
    builder.addCase(userThunks.isLoggedIn.rejected, (state, { payload }) => {
      if (payload) state.userMsg = payload.status;
    });
    builder.addCase(userThunks.isLoggedIn.pending, (state) => {
      state.userMsg = 'Checking if logged in';
    });
    builder.addCase(userThunks.getUser.fulfilled, (state) => {
      state.userMsg = 'User data received';
    });
    builder.addCase(userThunks.getUser.rejected, (state, { payload }) => {
      if (payload) state.userMsg = payload.status;
    });
    builder.addCase(userThunks.getUser.pending, (state) => {
      state.userMsg = 'Getting user data';
    });
    builder.addCase(userThunks.updateUser.fulfilled, (state, { payload }) => {
      const userUpdateData = payload.data;
      state.name = userUpdateData.name;
      state.email = userUpdateData.email;
      state.photo = userUpdateData.photo;
      state.age = userUpdateData.age;
      state.from = userUpdateData.from;
      state.bio = userUpdateData.bio;
      state.statsID = userUpdateData.statsID;
      state.id = userUpdateData._id;
      state.memoirIDs = userUpdateData.memoirIDs.slice();
      state.userMsg = 'User updated';
    });
    builder.addCase(userThunks.updateUser.rejected, (state, { payload }) => {
      if (payload) state.userMsg = payload.status;
    });
    builder.addCase(userThunks.updateUser.pending, (state) => {
      state.userMsg = 'Updating user Data';
    });
    builder.addCase(userThunks.deleteUser.fulfilled, (state) => {
      state.name = '';
      state.email = '';
      state.photo = '';
      state.age = 0;
      state.from = '';
      state.bio = 'Please, tell us about yourself a little.';
      state.statsID = '';
      state.id = '';
      state.memoirIDs = [];
      state.token = '';
      state.userMsg = 'Deleted a user';
    });
    builder.addCase(userThunks.deleteUser.rejected, (state, { payload }) => {
      if (payload) state.userMsg = payload.status;
    });
    builder.addCase(userThunks.deleteUser.pending, (state) => {
      state.userMsg = 'Deleting a user';
    });
    builder.addCase(
      userThunks.addProfileImage.fulfilled,
      (state, { payload }) => {
        const userUpdateData = payload.data;
        state.name = userUpdateData.name;
        state.email = userUpdateData.email;
        state.photo = userUpdateData.photo;
        state.age = userUpdateData.age;
        state.from = userUpdateData.from;
        state.bio = userUpdateData.bio;
        state.statsID = userUpdateData.statsID;
        state.id = userUpdateData._id;
        state.memoirIDs = userUpdateData.memoirIDs.slice();
        state.userMsg = 'Image Uploaded';
      },
    );
    builder.addCase(
      userThunks.addProfileImage.rejected,
      (state, { payload }) => {
        if (payload) state.userMsg = payload.status;
      },
    );
    builder.addCase(userThunks.addProfileImage.pending, (state) => {
      state.userMsg = 'Uploading an Image';
    });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
