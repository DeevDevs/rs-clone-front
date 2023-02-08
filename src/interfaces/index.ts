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
