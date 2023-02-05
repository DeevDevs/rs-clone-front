import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';
import Footer from './footer';

const Root = () => (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

export default Root;
