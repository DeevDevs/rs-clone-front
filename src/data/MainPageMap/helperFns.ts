/* eslint-disable @typescript-eslint/comma-dangle */
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import * as memoirTypes from '../../store/memoir/memoirTypes';
import { MapPoint } from '../../types';
import * as mapboxTypes from '../../store/mapbox/mapboxTypes';

export function addMarkerCurLocation(
  map: React.MutableRefObject<mapboxgl.Map | null>,
  userLocation: [number, number]
) {
  if (!map || !map.current) return;
  const el = document.createElement('div');
  el.className = 'homemarker';
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(userLocation)
    .addTo(map.current);

  new mapboxgl.Popup({
    offset: 30,
    closeOnClick: false,
  })
    .setLngLat(userLocation)
    .setHTML('<p id="homepin">You are here</p>')
    .addTo(map.current);
}

export function addMarkerMemoir(
  map: React.MutableRefObject<mapboxgl.Map | null>,
  memoirData: memoirTypes.TMemoirPreview
): mapboxTypes.TMarkerPopup | undefined {
  if (!map || !map.current) return;
  const el = document.createElement('div');
  el.className = 'marker';
  const marker: mapboxgl.Marker = new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(memoirData.memoirLocation)
    .addTo(map.current);

  const popup: mapboxgl.Popup = new mapboxgl.Popup({
    offset: 30,
    closeOnClick: false,
    closeButton: false,
  })
    .setLngLat(memoirData.memoirLocation)
    .setHTML(
      `<p id="memoirpin" data-id=${memoirData.memoirID}>${memoirData.memoirName}</p>`
    )
    .addTo(map.current);

  const markerPopup = {
    marker,
    popup,
  };
  // eslint-disable-next-line consistent-return
  return markerPopup;
}

export function addPoint(
  map: React.MutableRefObject<mapboxgl.Map | null>,
  coordinates: [number, number],
  popupName?: string,
): MapPoint | null {
  if (!map || !map.current) return null;
  const el = document.createElement('div');
  el.className = popupName === 'Journey started here' ? 'marker up' : 'marker down';
  const marker = new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(coordinates)
    .addTo(map.current);

  const popup = new mapboxgl.Popup({
    offset: 30,
    closeOnClick: false,
    closeButton: false,
  })
    .setLngLat(coordinates)
    .setHTML(
      `<p>${popupName}</p>`
    )
    .addTo(map.current);
  return { marker, popup };
}

export function toggleModuleOverlay() {
  const overlay = document.querySelector('.mapOverlay') as HTMLElement;
  const module = document.querySelector('.mapDialogue') as HTMLElement;
  if (overlay.classList.contains('hidden')) {
    overlay.classList.remove('hidden');
    module.classList.remove('hidden');
    setTimeout(() => {
      overlay.classList.remove('dissolved');
      module.classList.remove('dissolved');
    }, 20);
  } else {
    overlay.classList.add('dissolved');
    module.classList.add('dissolved');
    setTimeout(() => {
      overlay.classList.add('hidden');
      module.classList.add('hidden');
    }, 200);
  }
}

export function hideDisplayLogo(toDo: string) {
  const logoBox = document.querySelector('.mapLogo') as HTMLElement;
  if (toDo === 'show') {
    if (!logoBox.classList.contains('hidden')) return;
    logoBox.classList.remove('hidden');
    setTimeout(() => {
      logoBox.classList.remove('dissolved');
    }, 10);
  }
  if (toDo === 'hide') {
    if (logoBox.classList.contains('hidden')) return;
    logoBox.classList.add('dissolved');
    setTimeout(() => {
      logoBox.classList.add('hidden');
    }, 150);
  }
}
