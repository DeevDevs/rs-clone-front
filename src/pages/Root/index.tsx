import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Root = () => (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Root;
