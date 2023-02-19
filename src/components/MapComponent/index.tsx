import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { addMarker } from '../../data/MainPageMap/helperFns';
import { MapProps } from '../../types';

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ';

const MapComponent = ({ newMapInfo } : { newMapInfo: MapProps }) => {
  const mapContainer = useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);
  const { newLocation, markerName } = newMapInfo;

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [...newLocation],
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
    addMarker(map, newLocation, markerName);
    map.current.on('click', (e: mapboxgl.MapMouseEvent) => {
      const clickLongitude = e.lngLat.lng;
      const clickLatitude = e.lngLat.lat;
      if (+clickLongitude === 0 && +clickLatitude === 0) return;
      console.log([+clickLongitude.toFixed(4), +clickLatitude.toFixed(4)]);
    });
  });

  return (
    <div
      ref={mapContainer}
      className="mapContainer"
    />
  );
};

export default MapComponent;
