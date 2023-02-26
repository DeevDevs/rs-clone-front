/* eslint-disable max-len */
import React, { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import styles from './style.module.scss';
import 'mapbox-gl/dist/mapbox-gl.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax, @typescript-eslint/no-var-requires
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

mapboxgl.accessToken = 'pk.eyJ1IjoiZGVldmRldnMiLCJhIjoiY2xkdWpvZnlyMDZqdzNzcmYwcmhoNTVyZSJ9.TL4fwGpN6YdtqRKZpqOaAQ';

type OfferMapProps = {
  locations: [number, number][];
};

const OfferMap = (props: OfferMapProps) => {
  // const { pointTo, pointFrom, onChangeLocation } = props;
  // const { baseLocation: baseLocationTo, popupName: popupNameTo } = pointTo;
  const mapContainer = useRef(null);
  const map = React.useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (map.current) return;
    if (!mapContainer.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: [105.8369, 21.0227],
      zoom: 1,
      maxZoom: 9,
      minZoom: 2,
      // scrollZoom: false,
      projection: {
        name: 'mercator',
        center: [0, 30],
        parallels: [30, 30],
      },
      // interactive: false,
    });
    // const coordinates = [[105.8369, 21.0227], [108.3470, 15.9182], [106.4150, 10.7546]] as [number, number][];
    const { locations } = props;
    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((location) => {
      if (!map || !map.current) return;
      const el = document.createElement('div');
      el.className = 'marker';
      new mapboxgl.Marker({
        element: el,
        anchor: 'bottom',
      })
        .setLngLat(location)
        .addTo(map.current);
      bounds.extend(location);
    });

    map.current.fitBounds(bounds, {
      padding: {
        top: 40,
        bottom: 40,
        left: 40,
        right: 40,
      },
    });

    map.current.dragRotate.disable();
  }, []);

  return (
    <div
      ref={mapContainer}
      className={`mapContainer ${styles.offers_map}`}
    />
  );
};

export default OfferMap;
