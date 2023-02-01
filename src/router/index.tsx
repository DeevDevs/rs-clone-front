import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Test from '../pages/Test';
import Home from '../pages/Home';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path=""
        element={<Home />}
      />
      <Route
        path="/test"
        element={<Test />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
