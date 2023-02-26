import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/Button';
import { useAppDispatch, useAppSelector } from '../../../store';
import { mapboxActions } from '../../../store/mapbox';
import { deleteMemoir, getMemoir, getMemoirPreviews } from '../../../store/memoir/memoirThunks';
import TripDesc from './TripDesc/TripDesc';
import TripDetails from './TripDetails/TripDetails';
import styles from './TripPage.module.scss';

const TripPage = () => {
  const { tripName } = useAppSelector((state) => state.memoirReducer);

  const dispatchApp = useAppDispatch();
  const callbackDeleteMemoir = useCallback(async (memoirId: string) => {
    await dispatchApp(deleteMemoir(memoirId));
  }, []);
  const memoirIdURL = window.location.href.split('/').at(-1);
  const navigate = useNavigate();
  const { id: memoirId, previews } = useAppSelector((state) => state.memoirReducer);

  const callbackGetMemoirPreviews = useCallback(async () => {
    await dispatchApp(getMemoirPreviews());
  }, []);

  const callbackGetMemoir = useCallback(async (newMemoirId: string) => {
    await dispatchApp(getMemoir(newMemoirId));
  }, []);

  const cbChangeCallMapboxState = (): void => {
    dispatchApp(mapboxActions.changeCallPage('trip'));
  };

  const handleEraseClick = () => {
    callbackDeleteMemoir(memoirIdURL as string);
  };

  const handleEditClick = async () => {
    cbChangeCallMapboxState();
    await callbackGetMemoir(memoirIdURL as string);
    navigate('/trip');
  };

  useEffect(() => {
    if (memoirId === '') {
      callbackGetMemoirPreviews();
    }
  }, [memoirId]);

  useEffect(() => {
    if (memoirId === '') {
      navigate('/');
    }
  }, [previews]);

  return (
    <div className={styles.trip}>
      <h2 className={styles.trip_title}>
        { tripName }
      </h2>
      <TripDesc className={styles.trip_desc} />
      <TripDetails className={styles.trip_details} />
      <Button
        className={styles.trip_btn}
        onClick={handleEraseClick}
      >
        Erase this Memoir
      </Button>
      <Button
        className={styles.trip_btn}
        onClick={handleEditClick}
      >
        Edit this Memoir
      </Button>
    </div>
  );
};

export default TripPage;
