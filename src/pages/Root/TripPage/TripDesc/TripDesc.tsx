import React from 'react';
import { ClassNameProps } from '../../../../types';
import TripInfo from './TripInfo/TripInfo';
import TripSlider from './TripSlider';

const TripDesc = ({ className } : ClassNameProps) => (
  <section className={className}>
    <TripSlider />
    <TripInfo />
  </section>
);

export default TripDesc;
