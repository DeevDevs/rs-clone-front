import { createSlice } from '@reduxjs/toolkit';
import { InputTypes, SignUpInputsNames } from '../../enums';
import { SignUpLoginState } from '../../interfaces';

export const signUpLogin = createSlice({
  name: 'sighUpLogin',
  initialState: {
    signUp: true,
    signUpInputs: [
      {
        name: SignUpInputsNames.Name,
        type: InputTypes.Text,
        id: 'input1',
      },
      {
        name: SignUpInputsNames.Email,
        type: InputTypes.Email,
        id: 'input2',
      },
      {
        name: SignUpInputsNames.Password,
        type: InputTypes.Password,
        id: 'input3',
      },
      {
        name: SignUpInputsNames.RepeatPassword,
        type: InputTypes.Password,
        id: 'input4',
      },
    ],
    loginInputs: [
      {
        name: SignUpInputsNames.Email,
        type: InputTypes.Email,
      },
      {
        name: SignUpInputsNames.Password,
        type: InputTypes.Password,
      },
    ],
  },
  reducers: {
    changeStatus(state) {
      return {
        ...state,
        signUp: !state.signUp,
      };
    },
  },
});

export const {
  changeStatus,
} = signUpLogin.actions;

export const selectSignUp = (state: SignUpLoginState) => state.signUpLogin.signUp;
export const giveSignUpInputs = (state: SignUpLoginState) => state.signUpLogin.signUpInputs;
export const giveLoginInputs = (state: SignUpLoginState) => state.signUpLogin.loginInputs;
