/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './mapModule.scss';
import { useAppSelector, useAppDispatch } from '../../../../store/index';
import { toggleModuleOverlay } from '../../../../data/MainPageMap/helperFns';
import { mapboxActions } from '../../../../store/mapbox';
import { getMemoir } from '../../../../store/memoir/memoirThunks';

const MapModule = () => {
  const navigate = useNavigate();
  const dispatchApp = useAppDispatch();
  const { mapboxModuleMsg, clickedMemoirID } = useAppSelector(
    (state) => state.mapboxReducer
  );
  const { id } = useAppSelector((state) => state.userReducer);
  const { previews, countryName } = useAppSelector(
    (state) => state.memoirReducer
  );
  const cbStoreChosenMemoirID = (data: string): void => {
    dispatchApp(mapboxActions.storeChosenMemoirID(data));
  };
  const callbackGetMemoir = useCallback(async (memoirId: string) => {
    await dispatchApp(getMemoir(memoirId));
  }, []);
  const [moduleMessage, setModuleMessage] = useState(mapboxModuleMsg);
  const [btnText, setBtnText] = useState('Write new memoir');

  useEffect(() => {
    const memoirName = previews.find(
      (memoir) => memoir.memoirID === clickedMemoirID
    )?.memoirName;
    setModuleMessage(`${memoirName}`);
    setBtnText('Read this memoir');
  }, [clickedMemoirID]);

  useEffect(() => {
    if (id) {
      setModuleMessage(
        `Do you want to write about your trip to ${countryName}?`
      );
      setBtnText('Write new memoir');
      return;
    }
    setModuleMessage('You should login/signup, to write memoirs.');
    setBtnText('Login / Signup');
  }, [countryName]);

  return (
    <div
      className="mapOverlay dissolved hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('mapOverlay')) return;
        toggleModuleOverlay();
        cbStoreChosenMemoirID('');
      }}
    >
      <div className="mapDialogue dissolved hidden">
        <button
          className="mapDialogue_close"
          type="button"
          onClick={() => {
            toggleModuleOverlay();
            cbStoreChosenMemoirID('');
          }}
        >
          {' '}
        </button>
        <p className="mapDialogue_message">{moduleMessage}</p>
        <button
          type="button"
          className="mapDialogue_open"
          onClick={async () => {
            if (!id) {
              window.scrollTo(0, document.body.scrollHeight);
              toggleModuleOverlay();
              return;
            }
            if (id) {
              if (clickedMemoirID) {
                await callbackGetMemoir(clickedMemoirID);
                toggleModuleOverlay();
                navigate(`trip/${clickedMemoirID}`);
                return;
              }
              toggleModuleOverlay();
              navigate('trip');
            }
          }}
        >
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default MapModule;
