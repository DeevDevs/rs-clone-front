export type TDBMsg = {
  status: string;
};

export type TDBMemoir = {
  _id: string;
  tripName: string;
  destinationName: string;
  longLat: number[];
  countryName: string;
  continentName: string;
  whereFromLongLat: number[];
  distance: number;
  date: string;
  rateValue: number;
  days: number;
  sites: string[];
  memoirPhotos: string[];
  description: string;
};

export type TMemoir = {
  id: string;
  tripName: string;
  destinationName: string;
  longLat: number[];
  countryName: string;
  continentName: string;
  whereFromLongLat: number[];
  distance: number;
  date: string;
  rateValue: number;
  days: number;
  sites: string[];
  memoirPhotos: string[];
  description: string;
  memoirMsg: string | null;
  previews: TMemoirPreview[];
};

// Signup Data Objects

export type TNewMemoirReq = {
  userID: string;
  tripName: string;
  destinationName: string;
  longLat: [number, number];
  countryName: string;
  continentName: string;
  whereFromLongLat: number[];
  distance: number;
  memoirPhotos?: FileList | string[];
  date: string;
  rateValue: number;
  description: string;
  days: number;
  sites: string[];
};

export type TMemoirResp = {
  status: string;
  data: TDBMemoir;
};

// Update Data Object

export type TUpdMemoirReq = {
  id: string;
  tripName?: string;
  destinationName?: string;
  longLat?: [number, number];
  countryName?: string;
  continentName?: string;
  whereFromLongLat?: number[];
  distance?: number;
  date?: string;
  prevPhotos: string[];
  photosToDelete: string[];
  memoirPhotos?: FileList | string[];
  rateValue?: number;
  days?: number;
  sites?: string[];
};

export type TMemoirPreview = {
  memoirID: string;
  memoirLocation: [number, number];
  memoirName: string;
};

export type TPreviewsResp = {
  status: string;
  data: TMemoirPreview[];
};

export type TMapClickData = {
  longLat: [number, number];
  destinationName?: string;
  countryName?: string;
};
