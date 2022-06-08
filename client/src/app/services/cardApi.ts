import { apiSlice } from './api';
import { Card as CardType } from '../../types/index.ts';
import { createSelector } from '@reduxjs/toolkit';

export const cardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCard: builder.query<CardType, string>({
      query: (id) => `cards/${id}/`,
      providesTags: (result, error, arg) => [{ type: 'Cards', id: arg }],
    }),

    addCard: builder.mutation<CardType, Partial<CardType>>({
      query: (data) => {
        return { url: `cards/`, method: 'POST', body: data };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Cards', id: 'LIST' }],
    }),
    updateCard: builder.mutation<CardType, Partial<CardType>>({
      query: (data) => {
        const { id, ...body } = data;
        return { url: `cards/${id}/`, method: 'PATCH', body };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Cards', id: arg.id }],
    }),

    deleteCard: builder.mutation<void, string>({
      query: (id) => ({ url: `cards/${id}/`, method: 'DELETE' }),
      invalidatesTags: (result, error, arg) => [{ type: 'Cards', id: arg }],
    }),
  }),
});

export const {
  useGetCardQuery,
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
} = cardApi;

export const selectCardById = (id: string) =>
  createSelector(cardApi.endpoints.getCard.select(id), (card) => card.data);
