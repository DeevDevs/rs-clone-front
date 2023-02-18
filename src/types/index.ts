import React from 'react';

export type WrapperProps = {
  children: React.ReactNode;
};

export type FormInputItems = {
  memoir: string,
  destination: string,
  country: string,
  continent: string,
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

export type MapProps = {
  newLocation: [number, number];
  markerName: string;
};
