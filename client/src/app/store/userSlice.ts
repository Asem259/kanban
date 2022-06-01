import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../services/api';
import { Token } from '../../types/index.ts';
import { UserState } from '../../types/stateTypes';

const accessToken = localStorage.getItem('accessToken') || '';
const refreshToken = localStorage.getItem('refreshToken') || '';

const initialState: UserState = {
  accessToken: accessToken,
  refreshToken: refreshToken,
  isAuthenticated: Boolean(accessToken),
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: () => initialState,
    updateAccessToken(state, action: PayloadAction<Token>) {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
      localStorage.setItem('accessToken', action.payload.access);
      localStorage.setItem('refreshToken', action.payload.refresh);
    });
  },
});

export const { logout, updateAccessToken } = userSlice.actions;
