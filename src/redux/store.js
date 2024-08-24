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
import storage from 'redux-persist/lib/storage'; // використання localStorage
import { combineReducers } from 'redux';
import camperReducer from './reducers/camperSlice';
import postsReducer from './reducers/postsSlice';
// import { composeWithDevTools } from 'redux-devtools-extension';

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
