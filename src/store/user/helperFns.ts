import * as userTypes from './userTypes';

export function updateUserState(state: userTypes.TUser, newUser: userTypes.TDBUser) {
  state.name = newUser.name;
  state.email = newUser.email;
  state.photo = newUser.photo;
  state.age = newUser.age;
  state.from = newUser.from;
  state.bio = newUser.bio;
  state.statsID = newUser.statsID;
  state.id = newUser._id;
  state.memoirIDs = newUser.memoirIDs.slice();
}

export function emptyUserState(state: userTypes.TUser) {
  state.name = '';
  state.email = '';
  state.photo = 'https://i.ibb.co/420YqnY/sloth.jpg';
  state.age = 0;
  state.from = '';
  state.bio = 'Please, tell us about yourself a little.';
  state.statsID = '';
  state.id = '';
  state.memoirIDs = [];
  state.token = '';
}
