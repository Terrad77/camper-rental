import { configureStore } from '@reduxjs/toolkit';
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
import storage from 'redux-persist/lib/storage'; //use localStorage
import { combineReducers } from 'redux';
import camperReducer from './slices/camperSlice';
import postsReducer from './slices/postsSlice';

// Налаштовуємо persistConfig
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['campers'], //Persist the entire campers slice
};

// Combine all reducers
const rootReducer = combineReducers({
  campers: camperReducer,
  posts: postsReducer,
});

// Перетворюємо редюсер в персістований редюсер
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Налаштування store з persistedReducer
const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Налаштування persistor
const persistor = persistStore(store);

export { store, persistor };
