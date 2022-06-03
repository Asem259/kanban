import { createSlice } from '@reduxjs/toolkit';

import { apiSlice } from '../services/api';
import { NotificationState } from '../../types/stateTypes';
import { boardApi } from '../services/boardApi';

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
      .addMatcher(apiSlice.endpoints.login.matchFulfilled, (state, action) => {
        state.isActive = true;
        state.type = 'success';
        state.msg = 'Login Successful';
      })
      .addMatcher(apiSlice.endpoints.login.matchRejected, (state, action) => {
        state.isActive = true;
        state.type = 'error';
        state.msg = (action.payload as any).data.detail || 'Error Try later';
      })
      //register
      .addMatcher(
        apiSlice.endpoints.register.matchFulfilled,
        (state, action) => {
          state.isActive = true;
          state.type = 'success';
          state.msg = 'Your account has been successfully created';
        }
      )
      .addMatcher(
        apiSlice.endpoints.register.matchRejected,
        (state, action) => {
          state.isActive = true;
          state.type = 'error';
          state.msg =
            (action.payload as any).data.email[0] || 'Error Try later';
        }
      )
      // Update user
      .addMatcher(
        apiSlice.endpoints.updateUser.matchFulfilled,
        (state, action) => {
          state.isActive = true;
          state.type = 'success';
          state.msg = 'Your account has been successfully updated';
        }
      )
      .addMatcher(
        apiSlice.endpoints.updateUser.matchRejected,
        (state, action) => {
          state.isActive = true;
          state.type = 'error';
          state.msg = (action.payload as any).data.detail || 'Error Try later';
        }
      )

      // update, delete , create Board Notification
      .addMatcher(
        boardApi.endpoints.updateBoard.matchFulfilled,
        (state, action) => {
          const args = action.meta.arg.originalArgs;

          if (args.hasOwnProperty('title'))
            state.msg = action.payload.title + ' has been successfully updated';
          if (args.hasOwnProperty('is_favorite'))
            state.msg = `Board ${
              args.is_favorite ? 'added to' : 'removed from'
            }  your favorites`;

          state.isActive = true;
          state.type = 'success';
        }
      )
      .addMatcher(
        boardApi.endpoints.updateBoard.matchRejected,
        (state, action) => {
          state.isActive = true;
          state.type = 'error';
          state.msg =
            (action.payload as any).data.detail || 'Error Try again later';
        }
      )
      .addMatcher(
        boardApi.endpoints.deleteBoard.matchFulfilled,
        (state, action) => {
          state.isActive = true;
          state.type = 'success';
          state.msg = 'Board has been successfully deleted';
        }
      )
      .addMatcher(
        boardApi.endpoints.deleteBoard.matchRejected,
        (state, action) => {
          state.isActive = true;
          state.type = 'error';
          state.msg =
            (action.payload as any).data.detail || 'Error Try again later';
        }
      )
      .addMatcher(
        boardApi.endpoints.createBoard.matchFulfilled,
        (state, action) => {
          state.isActive = true;
          state.type = 'success';
          state.msg = 'Board has been successfully created';
        }
      )
      .addMatcher(
        boardApi.endpoints.createBoard.matchRejected,
        (state, action) => {
          state.isActive = true;
          state.type = 'error';
          state.msg =
            (action.payload as any).data.detail || 'Error Try again later';
        }
      );
  },
});

export const { resetNotifications } = notificationSlice.actions;
