import React from 'react';
import TripForm from './TripFormComp';
import BlockPageComp from '../../../components/BlockPageComp';
import { useAppSelector } from '../../../store';
import style from './TripFormPageComp.module.scss';

const TripFormPage = () => {
  const { id } = useAppSelector((state) => state.userReducer);
  const { clickLat, callPage } = useAppSelector((state) => state.mapboxReducer);

  return (
    <main className={style.tripPage}>
      {id
        ? (
          <>
            <h2 className={style.tripPageTitle}>Writing a Memoir</h2>
            {clickLat !== 0 || callPage === 'trip'
              ? <TripForm />
              : (
                <div className={style.tripPage_error}>
                  It seems that you want to record a new memoir.
                  Please, go to main page to start.
                </div>
              )}
          </>
        )
        : <BlockPageComp />}
    </main>
  );
};

export default TripFormPage;
