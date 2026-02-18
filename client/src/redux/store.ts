import { configureStore } from '@reduxjs/toolkit';
import reducer from './slices/authSlice';
import { trackerApi } from '../api/api';

export const store = configureStore({
  reducer: {
    auth: reducer,
    [trackerApi.reducerPath]: trackerApi.reducer
  },

  middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware().concat(trackerApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;