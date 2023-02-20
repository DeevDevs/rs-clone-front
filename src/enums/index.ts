export enum PagePath {
  Root = '/',
  TripForm = 'trip',
  Trip = 'trip/:tripId',
  Offers = 'offers',
  OfferDescription = 'offers/:offerId',
  Profile = 'profile',
  Error = '*',
}

export enum FooterImgAlts {
  Logo = 'logo',
  RsLogo = 'rsLogo',
  GitLogo = 'gitLogo',
}

export enum DevelopersNames {
  Vnuchkov = 'Dmitriy Vnuchkov',
  Kazakov = 'Maksim Kazakov',
  Luferov = 'Dmitriy Luferov',
}

export enum Links {
  Rs = 'https://rs.school/',
  Vnuchkov = 'https://github.com/DeevDevs',
  Kazakov = 'https://github.com/KazakovMaksim',
  Luferov = 'https://github.com/Luferov1',
}

export enum GitLinksKeys {
  GitLink1 = 'gitLink1',
  GitLink2 = 'gitLink2',
  GitLink3 = 'gitLink3',
}

export enum SignUpInputsNames {
  Name = 'Name',
  Email = 'SignUpEmail',
  Password = 'SignUpPassword',
  RepeatPassword = 'RepeatPassword',
}

export enum LoginInputsNames {
  Email = 'LoginEmail',
  Password = 'LoginPassword',
}

export enum SignUpLabels {
  Name = 'Name',
  Email = 'Email',
  Password = 'Password',
  RepeatPassword = 'Repeat Password',
}

export enum LoginLabels {
  Email = 'Email',
  Password = 'Password',
}

export enum SignUpLogin {
  SignUp = 'Sign Up',
  Login = 'Login',
}

export enum InputTypes {
  Text = 'text',
  Password = 'password',
  Email = 'email',
}

export enum InputId {
  SignUp1 = 'signup1',
  SignUp2 = 'signup2',
  SignUp3 = 'signup3',
  SignUp4 = 'signup4',
  Login1 = 'login1',
  Login2 = 'login2',
}

export enum RequiredMessages {
  Name = 'You must specify a name',
  Email = 'You must specify an email',
  Password = 'You must specify a password',
}

export enum LengthMessages {
  Three = 'must have at least 3 symbols',
  Eight = 'must have at least 8 symbols',
  Thirty = 'must have maximum 30 symbols',
}

export enum PatternMessages {
  Name = 'Name must contain letters only',
  Email = 'Email must match email format',
  Password = `Password must contain at least: 
  1 lowercase character, 
  1 uppercase character, 
  1 numeric character
  1 special character`,
}

export enum ValidationTypes {
  Required = 'required',
  MaxLength = 'maxLength',
  MinLength = 'minLength',
  Pattern = 'pattern',
}

export enum TripErrorMessages {
  Field = 'please, fill in the field',
  StartDate = 'please, fill in start date',
  EndDate = 'please, fill in end date',
  FieldMinLength = 'description must be at least 50 characters',
  FieldMaxLength = 'description must be no more than 500 characters',
  MaxFileLength = 'max file size is 2MB! Please, delete the highlighted file(s)',
}

export enum StatisticsItemsText {
  Places = 'Places visited',
  Satisfaction = 'Satisfaction level',
  Sites = 'Sites seen',
  None = '',
  Awful = 'It was awful',
  DidNotLike = "I didn't like it much",
  Good = 'It was good',
  Great = 'It was great',
  Awesome = 'It was awesome',
  Ok = 'It was OK',
}

export enum ContinentNames {
  Asia = 'Asia',
  Europe = 'Europe',
  Africa = 'Africa',
}

export enum StatisticsItemsKeys {
  StatisticsItem1 = 'statisticsItem1',
  StatisticsItem2 = 'statisticsItem2',
  StatisticsItem3 = 'statisticsItem3',
}

export enum UserErrorMessages {
  SignUp = 'User with such email already exists',
  Login = 'Email or Password is incorrect',
}

export enum OffersImgAlts {
  MainImg = 'main-img',
  Plane = 'plane',
}
