import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/rootPage/errorPage';
import Root from '../pages/rootPage';
import MainPage from '../pages/rootPage/mainPage';
import { PagePath } from '../enums';
import TripFormPage from '../pages/rootPage/tripFormPage';
import TripPage from '../pages/rootPage/tripFormPage/tripPage';
import OffersPage from '../pages/rootPage/offersPage';
import OfferDescriptionPage from '../pages/rootPage/offersPage/offerDescriptionPage';
import ProfilePage from '../pages/rootPage/profilePage';

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
      </Route>
      <Route
        path={PagePath.Error}
        element={<ErrorPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
