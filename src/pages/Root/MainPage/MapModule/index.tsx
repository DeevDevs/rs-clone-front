/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable @typescript-eslint/comma-dangle */
import React from 'react';
import './mapModule.scss';
import { useAppSelector } from '../../../../store/index';
import { toggleModuleOverlay } from '../../../../data/MainPageMap/helperFns';

const MapModule = () => {
  const { mapboxModuleMsg } = useAppSelector((state) => state.mapboxReducer);

  return (
    <div
      className="mapOverlay dissolved hidden"
      onClick={(e) => {
        const target = e.target as HTMLElement;
        if (target.classList.contains('mapDialogue')) return;
        toggleModuleOverlay();
      }}
    >
      <div className="mapDialogue dissolved hidden">
        <button
          className="mapDialogue_close"
          type="button"
          onClick={() => toggleModuleOverlay()}
        >
          {' '}
        </button>
        <p className="mapDialogue_message">Message here</p>
        <button type="button" className="mapDialogue_open">
          mapboxModuleMsg
          {mapboxModuleMsg}
        </button>
      </div>
    </div>
  );
};

export default MapModule;
