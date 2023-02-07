export type TDBError = {
  status: string;
};

export type TDBUser = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  stateID: string;
  memoirIDs: string[];
};

export type TUser = {
  id: string;
  name: string;
  email: string;
  photo: string;
  role: string;
  stateID: string;
  memoirIDs: string[];
  error: null | TDBError;
  token: string;
};

export type TSignup = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type TSignupResponse = {
  status: string;
  token: string;
  data: {
    user: TDBUser;
  };
};

export type TLogin = {
  email: string;
  password: string;
};

export type TLogoutResponse = {
  status: string;
  token: string;
};

export type TIsLoggedInRequest = {
  token: string | null;
};

export type TLoggedInResponse = {
  status: string;
  data: TDBUser;
};

export type TGetUserRequest = {
  id: string;
};

export type TUserCreds = {
  id: string;
  token: string;
};

export type TUpdUserReq = {
  id: string;
  name?: string;
  email?: string;
  photo?: string;
  password?: string;
};
