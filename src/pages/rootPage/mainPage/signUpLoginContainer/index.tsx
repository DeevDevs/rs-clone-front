/* eslint-disable react/jsx-props-no-spreading,jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { signUpLoginContainerState } from '../../../../data/signUpLoginStore';
import { SignUpFormData } from '../../../../interfaces';
import styles from './style.module.scss';
import {
  SignUpInputsNames, SignUpLabels, SignUpLogin, ValidationTypes,
} from '../../../../enums';

const SignUpLoginContainer = () => {
  const [state, changeState] = useState(signUpLoginContainerState);
  const {
    handleSubmit, register, formState: { errors }, watch,
  } = useForm<SignUpFormData>();
  const onSubmit: SubmitHandler<SignUpFormData> = (data) => console.log(data);
  const giveClassNames = (isSignUp: boolean): string => (
    isSignUp
      ? `${styles.selectButton} ${styles.selectButton_active} `
      : styles.selectButton);
  const goToLogin = () => {
    if (state.signUp) {
      const newState = { ...state, signUp: !state.signUp };
      changeState(newState);
    }
  };

  const goToSignUp = () => {
    if (!state.signUp) {
      const newState = { ...state, signUp: !state.signUp };
      changeState(newState);
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
          className={giveClassNames(state.signUp)}
          onClick={goToSignUp}
        >
          SignUp
        </button>
        <button
          type="button"
          className={giveClassNames(!state.signUp)}
          onClick={goToLogin}
        >
          Login
        </button>
      </div>
      {state.signUp
        ? state.signUpInputs.map((item) => (
          <div
            key={item.id}
            className={styles.inputContainer}
          >
            <label className={styles.label}>{item.label}</label>
            <input
              type={item.type}
              className={styles.input}
              {...register(item.name, {
                ...item.options,
                validate: (value) => {
                  if (item.label === SignUpLabels.RepeatPassword) {
                    return watch(SignUpInputsNames.Password) === value && value.length > 0
                      ? true
                      : 'Passwords doesn\u0027t match or field is empty';
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
          </div>
        ))
        : state.loginInputs.map((item) => (
          <div
            key={item.id}
            className={styles.inputContainer}
          >
            <label className={styles.label}>{item.label}</label>
            <input
              type={item.type}
              className={styles.input}
              {...register(item.name, item.options)}
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
        {state.signUp ? SignUpLogin.SignUp : SignUpLogin.Login}
      </button>
    </form>
  );
};

export default SignUpLoginContainer;
