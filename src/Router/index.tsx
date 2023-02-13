import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/Root/ErrorPage';
import Root from '../pages/Root';
import MainPage from '../pages/Root/MainPage';
import { PagePath } from '../enums';
import TripFormPage from '../pages/Root/TripFormPage';
import TripPage from '../pages/Root/TripFormPage/TripPage';
import OffersPage from '../pages/Root/OffersPage';
import OfferDescriptionPage from '../pages/Root/OffersPage/OfferDescriptionPage';
import ProfilePage from '../pages/Root/ProfilePage';
import TestPage from '../components/TempAllReqComponent';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={PagePath.Root}
        element={<Root />}
      >
        <Route index element={<MainPage />} />
        <Route
          path={PagePath.TripForm}
          element={<TripFormPage />}
        />
        <Route
          path={PagePath.Trip}
          element={<TripPage />}
        />
        <Route
          path={PagePath.Offers}
          element={<OffersPage />}
        />
        <Route
          path={PagePath.OfferDescription}
          element={<OfferDescriptionPage />}
        />
        <Route
          path={PagePath.Profile}
          element={<ProfilePage />}
        />
        <Route
          path="test"
          element={<TestPage />}
        />
      </Route>
      <Route
        path={PagePath.Error}
        element={<ErrorPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
