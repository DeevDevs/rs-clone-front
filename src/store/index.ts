import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { userReducer } from './user';
import { memoirReducer } from './memoir';
import { statsReducer } from './stats';
import { mapboxReducer } from './mapbox';
import { temp } from './temp';

export const rootReducer = combineReducers({
  tempReducer: temp.reducer,
  userReducer,
  memoirReducer,
  statsReducer,
  mapboxReducer,
});

export const store = () => configureStore({ reducer: rootReducer });

export type TRootReducer = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof store>;
export type TAppDispatch = TAppStore['dispatch'];
// export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootReducer> = useSelector;
