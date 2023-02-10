import React from 'react';
import {
  YMaps, Map, Placemark, ZoomControl,
} from '@pbe/react-yandex-maps';
import style from './TripMap.module.scss';

const TripMap = () => {
  const defaultState = {
    center: [55.751574, 37.573856],
    zoom: 9,
  };
  const defaultGeometryBallon = defaultState.center;

  return (
    <div className={style['map-container']}>
      <YMaps query={{ lang: 'en_US' }}>
        <Map
          style={{ width: '100%', height: '100%' }}
          defaultState={defaultState}
        >
          <ZoomControl style={{ color: '#fff' }} />
          <Placemark
            modules={['geoObject.addon.balloon']}
            defaultGeometry={defaultGeometryBallon}
            properties={{
              balloonContentBody:
                'The balloon information',
            }}
          />
        </Map>
      </YMaps>
    </div>
  );
};

export default TripMap;
