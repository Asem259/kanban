import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { api } from '../services/api';
import { Token, UserShort } from '../../types/index.ts';
import { UserState } from '../../types/stateTypes';

const getStateFromLocalStorage = (): UserState => {
  let startState: UserState = {
    accessToken: '',
    refreshToken: '',
    isAuthenticated: false,
    id: '',
    email: '',
  };
  try {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken && refreshToken) {
      const id = jwt_decode<UserShort>(accessToken)?.id;
      const email = jwt_decode<UserShort>(accessToken)?.email;
      const isAuthenticated = true;
      startState = {
        ...startState,
        id,
        email,
        accessToken,
        refreshToken,
        isAuthenticated,
      };
    }
  } catch (error) {
    console.log(error);
  }

  return startState;
};

const initialState = getStateFromLocalStorage();

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
    0;
    builder.addMatcher(api.endpoints.login.matchFulfilled, (state, action) => {
      state.accessToken = action.payload.access;
      state.refreshToken = action.payload.refresh;
      state.isAuthenticated = true;
      state.id = jwt_decode<UserShort>(action.payload.access)?.id;
      state.email = jwt_decode<UserShort>(action.payload.access)?.email;
      localStorage.setItem('accessToken', action.payload.access);
      localStorage.setItem('refreshToken', action.payload.refresh);
    });
  },
});

export const { logout, updateAccessToken } = userSlice.actions;
