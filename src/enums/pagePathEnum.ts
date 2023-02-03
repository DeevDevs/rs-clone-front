enum PagePath {
  root = '/',
  tripForm = 'trip',
  trip = 'trip/:tripId',
  offers = 'offers',
  offerDescription = 'offers/:offerId',
  profile = 'profile',
  error = '*',
}

export type WrapperProps = {
  children: React.ReactNode;
};

export default PagePath;
