import React from 'react';

export type WrapperProps = {
  children: React.ReactNode;
};

export type FormInputItems = {
  memoir: string,
  place: string,
  country: string,
  worldPart: string,
  sight: string,
  description: string,
  dateFrom: Date;
  dateTo: Date;
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
  setPhotos: (photos: FileTransferObj[]) => void
};
