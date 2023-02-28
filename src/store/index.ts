import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux';
import { userReducer } from './user';
import { memoirReducer } from './memoir';
import { statsReducer } from './stats';
import { mapboxReducer } from './mapbox';

export const rootReducer = combineReducers({
  userReducer,
  memoirReducer,
  statsReducer,
  mapboxReducer,
});

export const store = () => configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export type TRootReducer = ReturnType<typeof rootReducer>;
export type TAppStore = ReturnType<typeof store>;
export type TAppDispatch = TAppStore['dispatch'];
// export type TAppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<TAppDispatch>();
export const useAppSelector: TypedUseSelectorHook<TRootReducer> = useSelector;
