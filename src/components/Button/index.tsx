import React from 'react';
import { ButtonProps } from '../../types';
import styles from './Button.module.scss';

const Button: React.FC<ButtonProps> = (props) => {
  const { children, className, onClick } = props;
  return (
    <button
      type="button"
      className={`${styles.btn} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
