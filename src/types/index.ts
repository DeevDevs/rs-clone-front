import mapboxgl from 'mapbox-gl';
import React from 'react';

export type WrapperProps = {
  children: React.ReactNode;
};

export type FormInputItems = {
  tripName: string,
  destinationName: string,
  countryName: string,
  continentName: string,
  sites: string,
  description: string,
  dateFrom: string;
  dateTo: string;
  inputFile: string,
};

export type ValuesKey = keyof FormInputItems;

export type FileTransferObj = {
  name: string,
  type: string,
  size: number,
  src: string,
};

export type FileTransferProps = {
  photos: FileTransferObj[],
  setPhotos: (photos: FileTransferObj[]) => void,
};

export type TripSelectProp = {
  values: string[],
  selectedVal: number,
  handleChange: React.Dispatch<React.SetStateAction<number>>,
};

export type TripSitesProp = {
  sites: string[],
  handleDelete: React.Dispatch<React.SetStateAction<string[]>>,
};

export type ClassNameProps = { className: string };

export type ButtonProps =
  React.PropsWithChildren<{
    className: string
  }>
  & React.ButtonHTMLAttributes<HTMLButtonElement>;

export type Location = [number, number];
export type LocationData = {
  baseLocation: Location;
  popupName: string;
};

export type MapProps = {
  pointTo: LocationData;
  pointFrom?: LocationData;
  onChangeLocation?: React.Dispatch<React.SetStateAction<number[]>>;
};

export type MapPoint = {
  marker: mapboxgl.Marker;
  popup: mapboxgl.Popup;
};
