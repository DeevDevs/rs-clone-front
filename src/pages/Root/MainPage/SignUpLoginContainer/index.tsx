/* eslint-disable react/jsx-props-no-spreading */
import React, { useCallback, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUpLoginContainerState } from '../../../../data/signUpLoginStore';
import { SignUpFormData } from '../../../../interfaces';
import styles from './style.module.scss';
import {
  LengthMessages,
  SignUpInputsNames, SignUpLabels, SignUpLogin, ValidationTypes,
} from '../../../../enums';
import { useAppDispatch } from '../../../../store';
import * as userTypes from '../../../../store/user/userTypes';
import { login, signup } from '../../../../store/user/userThunks';

const SignUpLoginContainer = () => {
  const state = signUpLoginContainerState;
  const [isSignUp, setSignUp] = useState(true);
  const dispatchApp = useAppDispatch();
  const callbackSignup = useCallback(async (userData: userTypes.TSignupReq) => {
    await dispatchApp(signup(userData));
  }, []);
  const callbackLogin = useCallback(async (loginData: userTypes.TLoginReq) => {
    await dispatchApp(login(loginData));
  }, []);
  const {
    handleSubmit, register, formState: { errors }, watch,
  } = useForm<SignUpFormData>();
  const onSubmit: SubmitHandler<SignUpFormData> = ({
    Name,
    SignUpEmail,
    SignUpPassword,
    RepeatPassword,
    LoginEmail,
    LoginPassword,
  }) => {
    if (isSignUp) {
      const userData = {
        name: Name.trim(),
        email: SignUpEmail.trim(),
        password: SignUpPassword,
        passwordConfirm: RepeatPassword,
      };
      callbackSignup(userData);
    } else {
      const userData = {
        email: LoginEmail.trim(),
        password: LoginPassword,
      };
      callbackLogin(userData);
    }
  };
  const giveClassNames = (isSignup: boolean): string => (
    isSignup
      ? `${styles.selectButton} ${styles.selectButton_active} `
      : styles.selectButton);
  const goToLogin = () => {
    if (isSignUp) {
      setSignUp(false);
    }
  };

  const goToSignUp = () => {
    if (!isSignUp) {
      setSignUp(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={styles.form}
    >
      <div className={styles.selectButtonsContainer}>
        <button
          type="button"
          className={giveClassNames(isSignUp)}
          onClick={goToSignUp}
        >
          SignUp
        </button>
        <button
          type="button"
          className={giveClassNames(!isSignUp)}
          onClick={goToLogin}
        >
          Login
        </button>
      </div>
      {isSignUp
        ? state.signUpInputs.map((item) => (
          <div
            key={item.id}
            className={styles.inputContainer}
          >
            <label
              className={styles.label}
              htmlFor={item.id}
            >
              {item.label}
            </label>
            <input
              type={item.type}
              className={styles.input}
              id={item.id}
              {...register(item.name, {
                ...item.options,
                validate: (value) => {
                  if (item.label === SignUpLabels.RepeatPassword) {
                    return watch(SignUpInputsNames.Password) === value && value.length > 0
                      ? true
                      : 'Passwords doesn\u0027t match or field is empty';
                  }
                  if (item.label === SignUpLabels.Name) {
                    return value.trim().length > 2 || value.length === 0
                      ? true
                      : `Name ${LengthMessages.Three}`;
                  }
                  return true;
                },
              })}
            />
            {errors[item.name]
              && errors[item.name]?.type === ValidationTypes.Required
              && (
                <p className={styles.errorMessage}>
                  {errors[item.name]?.message}
                </p>
              )}
            {errors[item.name]
              && errors[item.name]?.type === ValidationTypes.MinLength
              && (
                <p className={styles.errorMessage}>
                  {`${item.label} ${errors[item.name]?.message}`}
                </p>
              )}
            {errors[item.name]
              && errors[item.name]?.type === ValidationTypes.MaxLength
              && (
                <p className={styles.errorMessage}>
                  {`${item.label} ${errors[item.name]?.message}`}
                </p>
              )}
            {errors[item.name]
              && errors[item.name]?.type === ValidationTypes.Pattern
              && (
                <p className={styles.errorMessage}>
                  {errors[item.name]?.message}
                </p>
              )}
            {errors[item.name]
              && item.name === SignUpInputsNames.RepeatPassword
              && (
                <p className={styles.errorMessage}>
                  {errors[item.name]?.message}
                </p>
              )}
            {errors[item.name]
              && item.name === SignUpInputsNames.Name
              && errors[item.name]?.type !== ValidationTypes.Required
              && errors[item.name]?.type !== ValidationTypes.Pattern
              && errors[item.name]?.type !== ValidationTypes.MaxLength
              && errors[item.name]?.type !== ValidationTypes.MinLength
              && (
                <p className={styles.errorMessage}>
                  {errors[item.name]?.message}
                </p>
              )}
          </div>
        ))
        : state.loginInputs.map((item) => (
          <div
            key={item.id}
            className={styles.inputContainer}
          >
            <label
              className={styles.label}
              htmlFor={item.id}
            >
              {item.label}
            </label>
            <input
              type={item.type}
              className={styles.input}
              {...register(item.name, item.options)}
              id={item.id}
            />
            {errors[item.name]
              && errors[item.name]?.type === ValidationTypes.Required
              && (
                <p className={styles.errorMessage}>
                  {errors[item.name]?.message}
                </p>
              )}
            {errors[item.name]
              && errors[item.name]?.type === ValidationTypes.Pattern
              && (
                <p className={styles.errorMessage}>
                  {errors[item.name]?.message}
                </p>
              )}
          </div>
        ))}
      <button
        type="submit"
        className={styles.submitButton}
      >
        {isSignUp ? SignUpLogin.SignUp : SignUpLogin.Login}
      </button>
    </form>
  );
};

export default SignUpLoginContainer;
