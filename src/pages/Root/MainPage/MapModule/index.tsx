/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/comma-dangle */
import React, { useState, useEffect } from 'react';
import './mapModule.scss';
import { useAppSelector, useAppDispatch } from '../../../../store/index';
import { toggleModuleOverlay } from '../../../../data/MainPageMap/helperFns';
import { mapboxActions } from '../../../../store/mapbox';

const MapModule = () => {
  const dispatchApp = useAppDispatch();
  const { mapboxModuleMsg, clickedMemoirID } = useAppSelector(
    (state) => state.mapboxReducer
  );
  const { previews, countryName } = useAppSelector((state) => state.memoirReducer);
  const cbStoreChosenMemoirID = (data: string): void => {
    dispatchApp(mapboxActions.storeChosenMemoirID(data));
  };
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
    setModuleMessage(`Do you want to write about a trip in ${countryName}?`);
    setBtnText('Write new memoir');
  }, [countryName]);

  return (
    <div
      className="mapOverlay dissolved hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('mapDialogue')) return;
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
        <button type="button" className="mapDialogue_open">
          {btnText}
        </button>
      </div>
    </div>
  );
};

export default MapModule;
