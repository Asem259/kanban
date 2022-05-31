import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
} from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';
import { Token, Credentials, User } from '../../types/index.ts';
import { updateAccessToken, logout } from '../store/userSlice';

const baseQuery = fetchBaseQuery({
  baseUrl: 'http://127.0.0.1:8000/api/',
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).user.accessToken;
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<FetchArgs | string> = async (
  args,
  api,
  extraOptions
) => {
  const state = api.getState() as RootState;
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      {
        url: 'auth/refresh',
        method: 'POST',
        body: { refresh: (api.getState() as RootState).user.refreshToken },
      },
      api,
      extraOptions
    );

    const res = refreshResult.data as Token;

    if (res) {
      api.dispatch(updateAccessToken(res));
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};
export const api = createApi({
  reducerPath: 'api',
  baseQuery: baseQueryWithReauth,

  endpoints: (builder) => ({
    // auth endPoints

    login: builder.mutation<Token, Credentials>({
      query: (credentials: Credentials) => ({
        url: 'auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    register: builder.mutation<User, Credentials>({
      query: (data: Credentials) => ({
        url: 'accounts/',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useLoginMutation, useRegisterMutation } = api;
