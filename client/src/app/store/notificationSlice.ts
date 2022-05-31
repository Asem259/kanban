import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { Token } from '../../types/index.ts';
import { NotificationState } from '../../types/stateTypes';

const initialState: NotificationState = {
  isActive: false,
  type: undefined,
  msg: '',
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    resetNotifications: () => initialState,
  },
  extraReducers: (builder) => {
    builder

      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.isActive = true;
        state.type = 'success';
        state.msg = 'Login Successful';
      })
      .addMatcher(api.endpoints.login.matchRejected, (state, action) => {
        console.log(action);
        state.isActive = true;
        state.type = 'error';
        state.msg = (action.payload as any).data.detail || 'Error Try later';
      })

      .addMatcher(api.endpoints.register.matchFulfilled, (state, action) => {
        state.isActive = true;
        state.type = 'success';
        state.msg = 'Your account has been successfully created';
      })
      .addMatcher(api.endpoints.register.matchRejected, (state, action) => {
        console.log(action);
        state.isActive = true;
        state.type = 'error';
        state.msg = (action.payload as any).data.email[0] || 'Error Try later';
      });
  },
});

export const { resetNotifications } = notificationSlice.actions;
