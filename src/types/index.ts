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
};

export type ValuesKey = keyof FormInputItems;
