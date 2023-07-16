// store/store.ts

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { userSlice, UserState } from './features/userSlice';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import storage from 'redux-persist/lib/storage';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';

// Define the root state type
export interface RootState {
  user: UserState; // Include other state slices if you have them
}

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({
  user: userSlice.reducer,
  // Add other reducers here if you have them
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
