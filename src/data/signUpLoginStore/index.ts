import {
  InputId,
  InputTypes,
  LengthMessages,
  LoginInputsNames,
  LoginLabels,
  PatternMessages,
  RequiredMessages,
  SignUpInputsNames,
  SignUpLabels,
} from '../../enums';

// eslint-disable-next-line import/prefer-default-export
export const signUpLoginContainerState = {
  signUp: true,
  signUpInputs: [
    {
      name: SignUpInputsNames.Name,
      label: SignUpLabels.Name,
      type: InputTypes.Text,
      id: InputId.SignUp1,
      options: {
        required: RequiredMessages.Name,
        minLength: {
          value: 3,
          message: LengthMessages.Three,
        },
        maxLength: {
          value: 30,
          message: LengthMessages.Thirty,
        },
        pattern: {
          value: /^[A-Za-z ]*$/,
          message: PatternMessages.Name,
        },
      },
    },
    {
      name: SignUpInputsNames.Email,
      label: SignUpLabels.Email,
      type: InputTypes.Email,
      id: InputId.SignUp2,
      options: {
        required: RequiredMessages.Email,
        maxLength: {
          value: 30,
          message: LengthMessages.Thirty,
        },
        pattern: {
          value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
          message: PatternMessages.Email,
        },
      },
    },
    {
      name: SignUpInputsNames.Password,
      label: SignUpLabels.Password,
      type: InputTypes.Password,
      id: InputId.SignUp3,
      options: {
        required: RequiredMessages.Password,
        minLength: {
          value: 8,
          message: LengthMessages.Eight,
        },
        pattern: {
          value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
          message: PatternMessages.Password,
        },
      },
    },
    {
      name: SignUpInputsNames.RepeatPassword,
      label: SignUpLabels.RepeatPassword,
      type: InputTypes.Password,
      id: InputId.SignUp4,
      options: {
      },
    },
  ],
  loginInputs: [
    {
      name: LoginInputsNames.Email,
      label: LoginLabels.Email,
      type: InputTypes.Email,
      id: InputId.Login1,
      options: {
        required: RequiredMessages.Email,
        pattern: {
          value: /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_-]+)(\.[a-zA-Z]{2,5}){1,2}$/,
          message: PatternMessages.Email,
        },
      },
    },
    {
      name: LoginInputsNames.Password,
      label: LoginLabels.Password,
      type: InputTypes.Password,
      id: InputId.Login2,
      options: {
        required: RequiredMessages.Password,
      },
    },
  ],
};
