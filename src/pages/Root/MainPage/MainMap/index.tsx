/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable object-curly-newline */
/* eslint-disable no-unsafe-optional-chaining */
import React, { useRef, useEffect, useState, useCallback } from 'react';
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { useAppDispatch, useAppSelector } from '../../../../store/index';
import 'mapbox-gl/dist/mapbox-gl.css';
import { mapboxActions } from '../../../../store/mapbox';
import styles from './style.module.scss';
import { getLocationData } from '../../../../store/mapbox/mapboxThunks';
// import pin from '../../../../data/MainPageMap/marker.png';
// eslint-disable-next-line operator-linebreak
mapboxgl.accessToken =
  'pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ';

const MainMap = () => {
  const dispatchApp = useAppDispatch();
  const getCurrentUserLocation = (location: number[]): void => {
    dispatchApp(mapboxActions.recordUserLocation(location));
  };
  const callbackGetLocationData = useCallback(async (clickLoc: number[]) => {
    await dispatchApp(getLocationData(clickLoc));
  }, []);
  // eslint-disable-next-line operator-linebreak
  const { userLocation, mapboxMsg, clickLong, clickLat, place, country } =
    useAppSelector((state) => state.mapboxReducer);
  const mapContainer = useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);
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
    console.log([clickLong, clickLat], place, country);
  }, [clickLong]);

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

    const el = document.createElement('div');
    el.className = `${styles.marker}`;
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(userLocation)
      .addTo(map.current);

    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(userLocation)
      .setHTML('<p>You are here</p>')
      .addTo(map.current);

    map.current.on('click', (e: mapboxgl.MapMouseEvent) => {
      const clickLongitude = e.lngLat.lng;
      const clickLatitude = e.lngLat.lat;
      if (+clickLongitude === 0 && +clickLatitude === 0) return;
      setClickLocation([+clickLongitude.toFixed(4), +clickLatitude.toFixed(4)]);
    });
  });

  // useEffect(() => {
  //   if (!map.current) return;
  //   map.current.on('move', () => {
  //     if (!map.current) return;
  //     setLng(+map.current.getCenter().lng.toFixed(4));
  //     setLat(+map.current.getCenter().lat.toFixed(4));
  //     setZoom(+map.current.getZoom().toFixed(2));
  //   });
  // });

  useEffect(() => {
    if (clickLocation[0] === 0 && clickLocation[1] === 0) return;
    callbackGetLocationData(clickLocation);
  }, [clickLocation]);

  // useEffect(() => {
  //   if (userLocation.length > 0) return;
  //   if (!map.current) return;
  //   setLng(Number(userLocation[0].toFixed(4)));
  //   setLat(Number(userLocation[1].toFixed(4)));
  // }, [userLocation]);

  return <div ref={mapContainer} className={styles.mapContainer} />;
};

export default MainMap;

//   new mapboxgl.Marker({
//     element: el,
//     anchor: 'bottom'
//   })
//     .setLngLat(loc.coordinates)
//     .addTo(map);
//   // add popup (добавляет сообщение над маркером)
//   new mapboxgl.Popup({
//     offset: 30
//   })
//     .setLngLat(loc.coordinates)
//     .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
//     .addTo(map);
//   bounds.extend(loc.coordinates);
// });
