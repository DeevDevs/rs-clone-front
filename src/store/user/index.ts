import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import toastSettings from '../constants';
import * as userTypes from './userTypes';
import * as userThunks from './userThunks';
import { updateUserState, emptyUserState } from './helperFns';

const initialState: userTypes.TUser = {
  id: '',
  name: 'Friendly Guest',
  email: '',
  photo: 'https://i.ibb.co/420YqnY/sloth.jpg',
  age: 0,
  from: '',
  bio: '',
  statsID: '',
  memoirIDs: [],
  userMsg: null,
  token: '',
  userLoading: false,
  userError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userThunks.signup.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      updateUserState(state, newUser);
      state.token = payload.token;
      state.userLoading = false;
      toast.info(`Welcome back, ${state.name}!`, { ...toastSettings });
    });
    builder.addCase(userThunks.signup.rejected, (state, { payload }) => {
      if (payload) state.userError = payload.status;
      toast.error(`${state.userError}`, { ...toastSettings });
    });
    builder.addCase(userThunks.signup.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userThunks.login.fulfilled, (state, { payload }) => {
      const newUser = payload.data.user;
      updateUserState(state, newUser);
      state.token = payload.token;
      state.userLoading = false;
      toast.info(`Welcome back, ${state.name}!`, { ...toastSettings });
    });
    builder.addCase(userThunks.login.rejected, (state, { payload }) => {
      if (payload) state.userError = payload.status;
      toast.error(`${state.userError}`, { ...toastSettings });
    });
    builder.addCase(userThunks.login.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userThunks.logout.fulfilled, (state) => {
      emptyUserState(state);
      state.token = '';
      state.userLoading = false;
      toast.info('You have logged out successfully!', { ...toastSettings });
    });
    builder.addCase(userThunks.logout.rejected, (state, { payload }) => {
      if (payload) state.userError = payload.status;
      toast.error(`${state.userError}`, { ...toastSettings });
    });
    builder.addCase(userThunks.logout.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userThunks.isLoggedIn.fulfilled, (state, { payload }) => {
      const newUser = payload.data;
      updateUserState(state, newUser);
      state.userLoading = false;
      toast.info(`Welcome back, ${state.name}!`, { ...toastSettings });
    });
    builder.addCase(userThunks.isLoggedIn.rejected, (state, { payload }) => {
      if (payload) state.userError = payload.status;
      toast.error(`${state.userError}`, { ...toastSettings });
    });
    builder.addCase(userThunks.isLoggedIn.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userThunks.getUser.fulfilled, (state) => {
      state.userMsg = 'User data received';
    });
    builder.addCase(userThunks.getUser.rejected, (state, { payload }) => {
      if (payload) state.userError = payload.status;
      toast.error(`${state.userError}`, { ...toastSettings });
    });
    builder.addCase(userThunks.getUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userThunks.updateUser.fulfilled, (state, { payload }) => {
      const userUpdateData = payload.data;
      updateUserState(state, userUpdateData);
      state.userLoading = false;
      toast.info(`${state.name}, your profile data has been updated!`, { ...toastSettings });
    });
    builder.addCase(userThunks.updateUser.rejected, (state, { payload }) => {
      if (payload) state.userError = payload.status;
      toast.error(`${state.userError}`, { ...toastSettings });
    });
    builder.addCase(userThunks.updateUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(userThunks.deleteUser.fulfilled, (state) => {
      emptyUserState(state);
      state.token = '';
      state.userLoading = false;
      toast.info('Your account has been deleted. Sad :( We hope to see you back soon!', { ...toastSettings });
    });
    builder.addCase(userThunks.deleteUser.rejected, (state, { payload }) => {
      if (payload) state.userError = payload.status;
      toast.error(`${state.userError}`, { ...toastSettings });
    });
    builder.addCase(userThunks.deleteUser.pending, (state) => {
      state.userLoading = true;
    });
    builder.addCase(
      userThunks.addProfileImage.fulfilled,
      (state, { payload }) => {
        const userUpdateData = payload.data;
        state.photo = userUpdateData.photo;
        state.userLoading = false;
        toast.info(`${state.name}, your profile image has been updated!`, { ...toastSettings });
      },
    );
    builder.addCase(
      userThunks.addProfileImage.rejected,
      (state, { payload }) => {
        if (payload) state.userError = payload.status;
        toast.error(`${state.userError}`, { ...toastSettings });
      },
    );
    builder.addCase(userThunks.addProfileImage.pending, (state) => {
      state.userLoading = true;
    });
  },
});

export const userReducer = userSlice.reducer;
export const userActions = userSlice.actions;
