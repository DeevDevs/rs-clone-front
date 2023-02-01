import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { user } from './user';
import { temp } from './temp';

const rootReducer = combineReducers({
  temp: temp.reducer,
  user: user.reducer,
});

const store = configureStore({
  reducer: rootReducer,
});
export default store;
