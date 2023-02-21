import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist/es/constants';

import { authReducer as auth } from '../features/auth/authSlice.js';
import { goalsReducer as goals } from '../features/goals/goalsSlice.js';

/* =============================
📦 Persist Config
============================= */
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
};

/* =============================
📦 Store
============================= */
export const store = configureStore({
  reducer: persistReducer(persistConfig, combineReducers({ auth, goals })),
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const storePersist = persistStore(store);
