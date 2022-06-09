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
    getFullBoard: builder.query<FullBoard, string>({
      query: (id) => `boards/${id}/`,
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.columns.map((col) => ({
                type: 'Columns' as const,
                id: col.id,
              })),
              ...result.labels.map((label) => ({
                type: 'Labels' as const,
                id: label.id,
              })),
              ...result.cards.map((card) => ({
                type: 'Cards' as const,
                id: card.id,
              })),

              { type: 'Columns', id: 'LIST' },
              { type: 'Labels', id: 'LIST' },
              { type: 'Cards', id: 'LIST' },
            ]
          : [
              { type: 'Columns', id: 'LIST' },
              { type: 'Labels', id: 'LIST' },
            ],
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
      query: (id) => ({
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
  (boardsResult) => boardsResult.data ?? []
);

export const selectBoardById = createSelector(
  selectAllBoards,
  (state: RootState, boardId: string) => boardId,
  (boards, boardId) => boards.find((board) => board.id === boardId)
);

const selectFullBoard = (id: string) =>
  createSelector(
    boardApi.endpoints.getFullBoard.select(id),
    (result) => result.data
  );

export const selectColumns = (id: string) =>
  createSelector(selectFullBoard(id), (data) => data?.columns);

export const selectColumnById = (boardId: string, colId: string) =>
  createSelector(selectColumns(boardId), (columns) =>
    columns?.find((col) => col.id === colId)
  );

export const selectLabels = (id: string) =>
  createSelector(selectFullBoard(id), (data) => data?.labels);

export const selectLabelById = (boardId: string, labelId: string) =>
  createSelector(selectLabels(boardId), (labels) =>
    labels?.find((label) => label.id === labelId)
  );
