import React, {
  useRef,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { toast } from 'react-toastify';
import mapboxgl from 'mapbox-gl';
import toastSettings from '../../../../store/constants';
import { useAppDispatch, useAppSelector } from '../../../../store/index';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxActions } from '../../../../store/mapbox';
import { memoirActions } from '../../../../store/memoir';
import './mainmap.scss';
import * as memoirTypes from '../../../../store/memoir/memoirTypes';
import * as mapboxTypes from '../../../../store/mapbox/mapboxTypes';
import getLocationData from '../../../../store/mapbox/mapboxThunks';
import {
  addMarkerCurLocation,
  addMarkerMemoir,
  toggleModuleOverlay,
  hideDisplayLogo,
} from '../../../../data/MainPageMap/helperFns';
import MapModule from '../MapModule'; // eslint-disable-line import/no-webpack-loader-syntax
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;
// import pin from '../../../../data/MainPageMap/marker.png';
mapboxgl.accessToken = 'pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ';

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
  const cdStoreMarker = (data: (mapboxTypes.TMarkerPopup | undefined)[]): void => {
    dispatchApp(mapboxActions.storeMarker(data));
  };
  const cbStoreChosenMemoirID = (data: string): void => {
    dispatchApp(mapboxActions.storeChosenMemoirID(data));
  };
  const callbackGetLocationData = useCallback(async (clickLoc: number[]) => {
    await dispatchApp(getLocationData(clickLoc));
  }, []);
  const {
    userLocation,
    mapLoading,
    clickLong,
    clickLat,
    place,
    country,
  } = useAppSelector((state) => state.mapboxReducer);
  const { previews } = useAppSelector((state) => state.memoirReducer);
  const mapContainer = useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const [clickLocation, setClickLocation] = useState([0, 0]);
  const [placedMarkers, setPlacedMarkers] = useState(false);

  useEffect(() => {
    if (userLocation[0] !== 0 && userLocation[0] !== 0) return;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        getCurrentUserLocation([
          position.coords.longitude,
          position.coords.latitude,
        ]);
      },
      () => {
        toast.error("Unfortunately, we couldn't retrieve your location.", { ...toastSettings });
      },
    );
  }, []);

  useEffect(() => {
    if (!mapLoading && clickLong !== 0 && clickLat !== 0) {
      const data = {
        longLat: [clickLong, clickLat],
        destinationName: place,
        countryName: country,
      } as memoirTypes.TMapClickData;
      saveDataFromClick(data);
      cbDetermineClickTarget('map');
      toggleModuleOverlay();
    }
  }, [mapLoading]);

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
      maxZoom: 9,
      minZoom: 2,
      projection: {
        name: 'mercator',
        center: [0, 30],
        parallels: [30, 30],
      },
    });
    map.current.dragRotate.disable();

    addMarkerCurLocation(map, userLocation);

    map.current.on('click', (e: mapboxgl.MapMouseEvent) => {
      const clickLongitude = e.lngLat.lng;
      const clickLatitude = e.lngLat.lat;
      if (+clickLongitude === 0 && +clickLatitude === 0) return;
      setClickLocation([+clickLongitude.toFixed(4), +clickLatitude.toFixed(4)]);
    });
  }, [userLocation[0], userLocation[1]]);

  useEffect(() => {
    if (!map.current) return;
    if (!previews.length) return;
    if (placedMarkers) return;
    const markersPopups = previews.map((preview) => {
      const markerPopup = addMarkerMemoir(map, preview);
      return markerPopup;
    });
    cdStoreMarker(markersPopups);
    setPlacedMarkers(true);
  }, [previews, map.current]);

  return (
    <div
      className="mapBlock"
      onMouseMove={(e) => {
        const mapBox = e.target as HTMLElement;
        const rect = mapBox.getBoundingClientRect();
        // Mouse position
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        if (x < 320 && y < 280 && mapBox.classList.contains('mapboxgl-canvas')) hideDisplayLogo('hide');
        if ((x > 320 || y > 280) && mapBox.classList.contains('mapboxgl-canvas')) hideDisplayLogo('show');
      }}
    >
      <MapModule />
      <div className="mapLogo" />
      <div
        role="presentation"
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
