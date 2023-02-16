import React from 'react';
import { ButtonProps } from '../../types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className } = props;
  return (
    <button type="button" className={`${styles.btn} ${className}`}>
      {children}
    </button>
  );
};

export default Button;
