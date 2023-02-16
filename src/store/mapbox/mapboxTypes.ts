export type TMapbox = {
  userLocation: [number, number];
  clickLat: number;
  clickLong: number;
  mapboxMsg: string;
  place: string;
  country: string;
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
