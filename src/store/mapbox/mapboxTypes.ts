import mapboxgl from 'mapbox-gl';

export type TMapbox = {
  userLocation: [number, number];
  clickLat: number;
  clickLong: number;
  mapboxMsg: string;
  place: string;
  country: string;
  clickedMemoirID: string;
  mapboxModuleMsg: string;
  clickTarget: 'map' | 'memoir';
  mainMapMarkers: TMarkerPopup[];
};

export type TMarkerPopup = {
  marker: mapboxgl.Marker;
  popup: mapboxgl.Popup;
};

export type TMapboxMsg = {
  status: string;
};

export type TLocationDataResp = {
  features: TMapFeature[];
  query: number[];
};

export type TMapFeature = {
  place_type: string;
  place_name: string;
  text: string;
};
