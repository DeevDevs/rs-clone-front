import React from 'react';
import styles from './style.module.scss';
import { UserErrorMessages } from '../../../../../enums';

const SignUpLoginError = ({ isSignUp }: { isSignUp: boolean }) => (
  <div className={styles.container}>
    {isSignUp ? UserErrorMessages.SignUp : UserErrorMessages.Login}
  </div>
);

export default SignUpLoginError;
