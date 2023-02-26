import React from 'react';
import { ClassNameProps } from '../../../../types';
import TripDetailsMap from './TripDetailsMap';
import TripDetailsStory from './TripDetailsStory';

const TripDetails = ({ className } : ClassNameProps) => (
  <section className={className}>
    <TripDetailsMap />
    <TripDetailsStory />
  </section>
);

export default TripDetails;
