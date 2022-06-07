import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import { apiSlice } from '../services/api';
import { userSlice } from './userSlice';
import { notificationSlice } from './notificationSlice';
import { boardSlice } from './boardSlice';

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    notification: notificationSlice.reducer,
    board: boardSlice.reducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
