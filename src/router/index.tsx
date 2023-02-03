import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ErrorPage from '../pages/rootPage/errorPage';
import Root from '../pages/rootPage';
import MainPage from '../pages/rootPage/mainPage';
import PagePath from '../enums/pagePathEnum';
import TripFormPage from '../pages/rootPage/tripFormPage';
import TripPage from '../pages/rootPage/tripFormPage/tripPage';
import OffersPage from '../pages/rootPage/offersPage';
import OfferDescriptionPage from '../pages/rootPage/offersPage/offerDescriptionPage';
import ProfilePage from '../pages/rootPage/profilePage';

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path={PagePath.root}
        element={<Root />}
      >
        <Route index element={<MainPage />} />
        <Route
          path={PagePath.tripForm}
          element={<TripFormPage />}
        />
        <Route
          path={PagePath.trip}
          element={<TripPage />}
        />
        <Route
          path={PagePath.offers}
          element={<OffersPage />}
        />
        <Route
          path={PagePath.offerDescription}
          element={<OfferDescriptionPage />}
        />
        <Route
          path={PagePath.profile}
          element={<ProfilePage />}
        />
      </Route>
      <Route
        path={PagePath.error}
        element={<ErrorPage />}
      />
    </Routes>
  </BrowserRouter>
);

export default Router;
