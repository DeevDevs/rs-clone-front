import React from 'react';
import { WrapperProps } from '../../types';

import './Wrapper.scss';

const Wrapper = ({ children }: WrapperProps) => (
  <div className="wrapper">{children}</div>
);

export default Wrapper;
