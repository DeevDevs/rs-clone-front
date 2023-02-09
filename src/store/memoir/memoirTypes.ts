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
  memoirPhoto: string;
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
  memoirPhoto: string;
  description: string;
  message: string | null;
};

// Signup Data Objects

export type TNewMemoirReq = {
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
  longLat?: number[];
  countryName?: string;
  continentName?: string;
  whereFromLongLat?: number[];
  distance?: number;
  date?: string;
  rateValue?: number;
  days?: number;
  sites?: string[];
};
