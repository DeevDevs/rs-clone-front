import React from 'react';
import { WrapperProps } from '../../enums/pagePathEnum';
import './wrapper.scss';

const Wrapper = ({ children }: WrapperProps) => (
  <div className="wrapper">{children}</div>
);

export default Wrapper;
