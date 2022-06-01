import { createSlice } from '@reduxjs/toolkit';

import { api } from '../services/api';
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
      // Login
      .addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
        state.isActive = true;
        state.type = 'success';
        state.msg = 'Login Successful';
      })
      .addMatcher(api.endpoints.login.matchRejected, (state, action) => {
        state.isActive = true;
        state.type = 'error';
        state.msg = (action.payload as any).data.detail || 'Error Try later';
      })
      //register
      .addMatcher(api.endpoints.register.matchFulfilled, (state, action) => {
        state.isActive = true;
        state.type = 'success';
        state.msg = 'Your account has been successfully created';
      })
      .addMatcher(api.endpoints.register.matchRejected, (state, action) => {
        state.isActive = true;
        state.type = 'error';
        state.msg = (action.payload as any).data.email[0] || 'Error Try later';
      })
      // Update user
      .addMatcher(api.endpoints.updateUser.matchFulfilled, (state, action) => {
        state.isActive = true;
        state.type = 'success';
        state.msg = 'Your account has been successfully updated';
      })
      .addMatcher(api.endpoints.updateUser.matchRejected, (state, action) => {
        state.isActive = true;
        state.type = 'error';
        state.msg = (action.payload as any).data.detail || 'Error Try later';
      });
  },
});

export const { resetNotifications } = notificationSlice.actions;
