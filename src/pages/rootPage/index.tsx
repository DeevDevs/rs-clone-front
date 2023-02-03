import React from 'react';
import { Outlet } from 'react-router-dom';

const Root = () => (
  <div>
    <header>
      This is header
    </header>
    <Outlet />
    <footer>
      this is footer
    </footer>
  </div>
);

export default Root;
