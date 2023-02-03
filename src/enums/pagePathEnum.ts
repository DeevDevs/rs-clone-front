enum PagePath {
  Root = '/',
  TripForm = 'trip',
  Trip = 'trip/:tripId',
  Offers = 'offers',
  OfferDescription = 'offers/:offerId',
  Profile = 'profile',
  Error = '*',
}

export default PagePath;
