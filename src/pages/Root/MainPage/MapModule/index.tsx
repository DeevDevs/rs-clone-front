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
  const { mapboxModuleMsg, clickedMemoirID, clickTarget } = useAppSelector(
    (state) => state.mapboxReducer,
  );
  const { id } = useAppSelector((state) => state.userReducer);
  const { previews, countryName, longLat } = useAppSelector(
    (state) => state.memoirReducer,
  );
  const cbStoreChosenMemoirID = (data: string): void => {
    dispatchApp(mapboxActions.storeChosenMemoirID(data));
  };
  const cbDetermineClickTarget = (data: string): void => {
    dispatchApp(mapboxActions.determineClickTarget(data));
  };
  const callbackGetMemoir = useCallback(async (memoirId: string) => {
    await dispatchApp(getMemoir(memoirId));
  }, []);
  const [moduleMessage, setModuleMessage] = useState(mapboxModuleMsg);
  const [btnText, setBtnText] = useState('Write new memoir');

  useEffect(() => {
    if (clickTarget === 'memoir') {
      const memoirName = previews.find(
        (memoir) => memoir.memoirID === clickedMemoirID,
      )?.memoirName;
      setModuleMessage(`${memoirName}`);
      setBtnText('Read this memoir');
    }
  }, [clickTarget]);

  useEffect(() => {
    if (id) {
      setModuleMessage(
        `Do you want to write about your trip to ${countryName}?`,
      );
      setBtnText('Write new memoir');
    } else {
      setModuleMessage('You should login/signup, to write memoirs.');
      setBtnText('Login / Signup');
    }
  }, [longLat]);

  return (
    <div
      role="presentation"
      className="mapOverlay dissolved hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (!target.classList.contains('mapOverlay')) return;
        toggleModuleOverlay();
        cbDetermineClickTarget('');
        cbStoreChosenMemoirID('');
      }}
    >
      <div className="mapDialogue dissolved hidden">
        <button
          className="mapDialogue_close"
          type="button"
          onClick={() => {
            toggleModuleOverlay();
            cbDetermineClickTarget('');
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
              if (clickTarget === 'memoir') {
                await callbackGetMemoir(clickedMemoirID);
                toggleModuleOverlay();
                navigate(`trip/${clickedMemoirID}`);
                return;
              }
              if (clickTarget === 'map') {
                toggleModuleOverlay();
                navigate('trip');
              }
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
