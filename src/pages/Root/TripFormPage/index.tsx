import React from 'react';
import TripForm from './TripFormComp';
import BlockPageComp from '../../../components/BlockPageComp';
import { useAppSelector } from '../../../store';
import style from './TripFormPageComp.module.scss';

const TripFormPage = () => {
  const { id } = useAppSelector((state) => state.userReducer);
  return (
    <main className={style.tripPage}>
      {id
        ? (
          <>
            <h2 className={style.tripPageTitle}>Writing a Memoir</h2>
            <TripForm />
          </>
        )
        : <BlockPageComp />}
    </main>
  );
};

export default TripFormPage;
