/* eslint-disable @typescript-eslint/comma-dangle */
import mapboxgl from 'mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import * as memoirTypes from '../../store/memoir/memoirTypes';

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
) {
  if (!map || !map.current) return;
  const el = document.createElement('div');
  el.className = 'marker';
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(memoirData.memoirLocation)
    .addTo(map.current);

  new mapboxgl.Popup({
    offset: 30,
    closeOnClick: false,
    closeButton: false,
  })
    .setLngLat(memoirData.memoirLocation)
    .setHTML(`<p id="memoirpin" data-id=${memoirData.memoirID}>${memoirData.memoirName}</p>`)
    .addTo(map.current);
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
