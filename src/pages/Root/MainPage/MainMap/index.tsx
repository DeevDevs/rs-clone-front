/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useAppDispatch, useAppSelector } from '../../../../store/index';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxActions } from '../../../../store/mapbox';
import { memoirActions } from '../../../../store/memoir';
import './mainmap.scss';
import * as memoirTypes from '../../../../store/memoir/memoirTypes';
import { getLocationData } from '../../../../store/mapbox/mapboxThunks';
import {
  addMarkerCurLocation,
  addMarkerMemoir,
  toggleModuleOverlay,
  hideDisplayLogo,
} from '../../../../data/MainPageMap/helperFns';
import MapModule from '../MapModule';
// import pin from '../../../../data/MainPageMap/marker.png';
// eslint-disable-next-line operator-linebreak
mapboxgl.accessToken =
  'pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ';

const MainMap = () => {
  const dispatchApp = useAppDispatch();
  const getCurrentUserLocation = (location: number[]): void => {
    dispatchApp(mapboxActions.recordUserLocation(location));
  };
  const saveDataFromClick = (data: memoirTypes.TMapClickData): void => {
    dispatchApp(memoirActions.addDataFromMapClick(data));
  };
  const cbDetermineClickTarget = (data: string): void => {
    dispatchApp(mapboxActions.determineClickTarget(data));
  };
  const cbStoreChosenMemoirID = (data: string): void => {
    dispatchApp(mapboxActions.storeChosenMemoirID(data));
  };
  const callbackGetLocationData = useCallback(async (clickLoc: number[]) => {
    await dispatchApp(getLocationData(clickLoc));
  }, []);
  // eslint-disable-next-line operator-linebreak
  const { userLocation, mapboxMsg, clickLong, clickLat, place, country } =
    useAppSelector((state) => state.mapboxReducer);
  const { previews } = useAppSelector((state) => state.memoirReducer);
  const mapContainer = useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [clickLocation, setClickLocation] = useState([0, 0]);

  useEffect(() => {
    console.log(mapboxMsg);
  }, [mapboxMsg]);

  useEffect(() => {
    if (userLocation[0] !== 0 && userLocation[0] !== 0) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getCurrentUserLocation([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      (error) => {
        console.log(error);
      }
    );
  });

  useEffect(() => {
    if (mapboxMsg !== 'data received') return;
    const data = {
      longLat: [clickLong, clickLat],
      destinationName: place,
      countryName: country,
    } as memoirTypes.TMapClickData;
    saveDataFromClick(data);
    cbDetermineClickTarget('map');
    toggleModuleOverlay();
  }, [mapboxMsg]);

  useEffect(() => {
    if (clickLocation[0] === 0 && clickLocation[1] === 0) return;
    callbackGetLocationData(clickLocation);
  }, [clickLocation]);

  useEffect(() => {
    if (userLocation[0] === 0 && userLocation[1] === 0) return;
    if (map.current) return;
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [
        Number(userLocation[0].toFixed(4)),
        Number(userLocation[1].toFixed(4)),
      ],
      zoom: 5,
    });
    addMarkerCurLocation(map, userLocation);

    map.current.on('click', (e: mapboxgl.MapMouseEvent) => {
      const clickLongitude = e.lngLat.lng;
      const clickLatitude = e.lngLat.lat;
      if (+clickLongitude === 0 && +clickLatitude === 0) return;
      setClickLocation([+clickLongitude.toFixed(4), +clickLatitude.toFixed(4)]);
    });
  });

  useEffect(() => {
    if (!map.current) return;
    previews.forEach((preview) => addMarkerMemoir(map, preview));
  }, [previews]);

  return (
    <div
      className="mapBlock"
      onMouseMove={(e) => {
        const mapBox = e.target as HTMLElement;
        const rect = mapBox.getBoundingClientRect();
        // Mouse position
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 240 && y < 170) hideDisplayLogo('hide');
        if (x > 240 || y > 170) hideDisplayLogo('show');
      }}
    >
      <MapModule />
      <div className="mapLogo" />
      <div
        ref={mapContainer}
        className="mapContainer"
        onClick={(e) => {
          const element = e.target as HTMLElement;
          if (element && element.id !== 'memoirpin') return;
          const memoirID = element.dataset.id as string;
          cbDetermineClickTarget('memoir');
          cbStoreChosenMemoirID(memoirID);
          toggleModuleOverlay();
        }}
      />
    </div>
  );
};

export default MainMap;
