import React from 'react';
import TripForm from './tripForm';
import style from './tripFormPage.module.scss';

const TripFormPage = () => (
  <main className={style.tripPage}>
    <h2 className={style.tripPageTitle}>Writing a Memoir</h2>
    <TripForm />
  </main>
);

export default TripFormPage;
