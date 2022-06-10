import { apiSlice } from './api';
import {
  Card as CardType,
  MoveCardProps,
  Task,
  UpdateCardLabelRequest,
} from '../../types/index.ts';
import { boardSlice } from '../store/boardSlice';
import { boardApi } from './boardApi';

export const cardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getCard: builder.query<CardType, string>({
    //   query: (id) => `cards/${id}/`,
    //   providesTags: (result, error, arg) => [{ type: 'Cards', id: arg }],
    // }),

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
    addTask: builder.mutation<Task, Partial<Task>>({
      query: (data) => {
        return { url: `tasks/`, method: 'POST', body: data };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Cards', id: arg.card },
      ],
    }),
    updateTask: builder.mutation<Task, Partial<Task>>({
      query: (data) => {
        const { id, ...body } = data;
        return { url: `tasks/${id}/`, method: 'PATCH', body };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Cards', id: arg.card },
      ],
    }),
    deleteTask: builder.mutation<void, { taskId: string; cardId: string }>({
      query: ({ taskId, cardId }) => ({
        url: `tasks/${taskId}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'Cards', id: arg.cardId },
      ],
    }),
    moveCard: builder.mutation<CardType, MoveCardProps>({
      query: (data) => {
        const { id } = data;
        const body = { id, column: data.to, order: data.order };
        return { url: `cards/${id}/`, method: 'PATCH', body };
      },
      invalidatesTags: (result, error, arg) => ['Cards', 'Columns'],
    }),
  }),
});

export const {
  useAddCardMutation,
  useDeleteCardMutation,
  useUpdateCardMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useMoveCardMutation,
} = cardApi;
