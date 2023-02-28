import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { addPoint } from '../../data/MainPageMap/helperFns';
import { MapPoint, MapProps } from '../../types';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ';

const MapComponent = (props : MapProps) => {
  const { pointTo, pointFrom, onChangeLocation } = props;
  const { baseLocation: baseLocationTo, popupName: popupNameTo } = pointTo;
  const mapContainer = useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [...baseLocationTo],
      zoom: 5,
      maxZoom: 9,
      minZoom: 2,
      projection: {
        name: 'mercator',
        center: [0, 30],
        parallels: [30, 30],
      },
    });

    if (pointFrom && pointFrom.baseLocation.join('') !== '00') {
      const bounds = new mapboxgl.LngLatBounds();
      bounds.extend(pointTo.baseLocation);
      bounds.extend(pointFrom.baseLocation);
      map.current.fitBounds(bounds, {
        padding: {
          top: 60,
          bottom: 60,
          left: 140,
          right: 140,
        },
      });
    }

    let mapPoint: MapPoint | null = null;

    map.current.dragRotate.disable();
    addPoint(map, baseLocationTo, popupNameTo);
    if (pointFrom && pointFrom.baseLocation.join('') !== '00') {
      const { baseLocation: baseLocationFrom, popupName: popupNameFrom } = pointFrom;
      mapPoint = addPoint(map, baseLocationFrom, popupNameFrom);
    }

    if (onChangeLocation) {
      map.current.on('click', (e: mapboxgl.MapMouseEvent) => {
        const clickLongitude = e.lngLat.lng;
        const clickLatitude = e.lngLat.lat;
        if (mapPoint) {
          mapPoint.marker.remove();
          mapPoint.popup.remove();
        }
        if (+clickLongitude === 0 && +clickLatitude === 0) return;
        onChangeLocation([+clickLongitude.toFixed(4), +clickLatitude.toFixed(4)]);
        mapPoint = addPoint(map, [+clickLongitude.toFixed(4), +clickLatitude.toFixed(4)], 'Journey started here');
      });
    }
  });

  return (
    <div
      ref={mapContainer}
      className="mapContainer"
    />
  );
};

export default MapComponent;
