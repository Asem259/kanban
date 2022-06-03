import { createSelector } from '@reduxjs/toolkit';

import { apiSlice } from './api';
import { Board, FullBoard } from '../../types/index.ts';
import { RootState } from '../store/store';

export const boardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBoards: builder.query<Board[], void>({
      query: () => `boards/`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.map((board) => ({
                type: 'Boards' as const,
                id: board.id,
              })),
              { type: 'Boards', id: 'LIST' },
            ]
          : [{ type: 'Boards', id: 'LIST' }],
    }),
    getFullBoard: builder.query<FullBoard, void>({
      query: () => `boards/`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.columns.map((col) => ({
                type: 'Columns' as const,
                id: col.id,
              })),
              { type: 'Columns', id: 'LIST' },
            ]
          : [{ type: 'Columns', id: 'LIST' }],
    }),
    updateBoard: builder.mutation<Board, Partial<Board>>({
      query: (data: Partial<Board>) => ({
        url: `boards/${data.id}/`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Boards', id: arg.id }],
    }),
    createBoard: builder.mutation<Board, Partial<Board>>({
      query: (data) => {
        return { url: `boards/`, method: 'Post', body: data };
      },
      invalidatesTags: [{ type: 'Boards', id: 'LIST' }],
    }),
    deleteBoard: builder.mutation<void, string>({
      query: (id: string) => ({
        url: `boards/${id}/`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Boards', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useGetFullBoardQuery,
  useUpdateBoardMutation,
  useCreateBoardMutation,
  useDeleteBoardMutation,
} = boardApi;

const selectBoardsResult = boardApi.endpoints.getBoards.select();

export const selectAllBoards = createSelector(
  selectBoardsResult,
  (boardsResult) => boardsResult?.data ?? []
);

export const selectBoardById = createSelector(
  selectAllBoards,
  (state: RootState, boardId: string) => boardId,
  (boards, boardId) => boards.find((board) => board.id === boardId)
);
