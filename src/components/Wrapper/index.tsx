import React from 'react';
import { ToastContainer } from 'react-toastify';
import { WrapperProps } from '../../types';
import 'react-toastify/dist/ReactToastify.css';
import './WrapperComp.scss';
import LoadingComp from '../LoadingComp';

const Wrapper = ({ children }: WrapperProps) => (
  <div className="wrapperParent">
    <div className="wrapper">{children}</div>
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover={false}
      theme="light"
    />
    <LoadingComp />
  </div>
);
export default Wrapper;

// toast.warn('🦄 Wow so easy!', {
//   position: 'top-right',
//   autoClose: 3000,
//   hideProgressBar: false,
//   closeOnClick: true,
//   pauseOnHover: false,
//   draggable: true,
//   progress: undefined,
//   theme: 'light',
// });
