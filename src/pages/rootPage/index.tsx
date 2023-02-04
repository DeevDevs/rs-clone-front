import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './header';

const Root = () => (
  <div>
    <Header />
    <Outlet />
    <footer>
      this is footer
    </footer>
  </div>
);

export default Root;
