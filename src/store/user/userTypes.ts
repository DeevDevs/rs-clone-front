export type TDBMsg = {
  status: string;
};

export type TDBUser = {
  _id: string;
  name: string;
  email: string;
  photo: string;
  age: number;
  from: string;
  bio: string;
  statsID: string;
  memoirIDs: string[];
};

export type TUserDataResp = {
  status: string;
  data: TDBUser;
};

export type TUser = {
  id: string;
  name: string;
  age: number;
  from: string;
  bio: string;
  photo: string;
  statsID: string;
  email: string;
  memoirIDs: string[];
  userMsg: null | string;
  token: string;
};

// Signup Data Objects

export type TSignupReq = {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
};

export type TSignupResp = {
  status: string;
  token: string;
  data: {
    user: TDBUser;
  };
};

// Login Data Objects

export type TLoginReq = {
  email: string;
  password: string;
};

// Logout Data Object

export type TLogoutResp = {
  status: string;
  token: string;
};

// UpdateUser Data Object

export type TUpdUserReq = {
  id: string;
  name?: string;
  email?: string;
  photo?: string;
  password?: string;
};
