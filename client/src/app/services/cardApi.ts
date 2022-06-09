import { apiSlice } from './api';
import { Card as CardType, UpdateCardLabelRequest } from '../../types/index.ts';
import { boardSlice } from '../store/boardSlice';
import { boardApi } from './boardApi';

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
    updateCard: builder.mutation<
      CardType,
      Partial<CardType> | UpdateCardLabelRequest
    >({
      query: (data) => {
        const { id, ...body } = data;
        return {
          url: `cards/${id}/`,
          method: 'PATCH',
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const boardId = boardSlice.getInitialState().currentBoard;
        try {
          const { data: updatedCard } = await queryFulfilled;
          console.log(updatedCard);

          const patchResult = dispatch(
            boardApi.util.updateQueryData('getFullBoard', boardId, (draft) => {
              const card = draft.cards.find((card) => card.id === args.id);

              Object.assign(card as CardType, updatedCard);
            })
          );
        } catch {}
      },
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
