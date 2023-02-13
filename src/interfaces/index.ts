import { FooterImgAlts, Links, StatisticsItemsText } from '../enums';
import { StatsArrays } from '../store/stats/statsTypes';

export interface SignUpLoginState {
  signUpLogin: {
    signUp: boolean
    signUpInputs: {
      name: string,
      type: string,
      id: string,
    }[],
    loginInputs: {
      name: string,
      type: string,
      id: string,
    }[],
  }
}

export interface SignUpFormData {
  Name: string,
  SignUpEmail: string,
  SignUpPassword: string,
  LoginEmail: string,
  LoginPassword: string,
  RepeatPassword: string,
}

export interface FooterLinkInterface {
  to: Links,
  imgSrc: string | undefined,
  imgAlt: FooterImgAlts,
  linkClassName?: string,
  imgClassName?: string,
  spanText?: string,
}

export interface StatisticsPlacesInterface {
  places: number,
  satisfaction: number,
  sites: number,
}

export interface StatisticsItemInterface {
  mark: number,
  maximum: number,
  text: StatisticsItemsText,
}

export interface KilometersInterface {
  distance: number,
}

export interface PlacesInterface {
  continents: StatsArrays[],
  countries: StatsArrays[],
}
