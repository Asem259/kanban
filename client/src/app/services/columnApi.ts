import { createSelector } from '@reduxjs/toolkit';

import { apiSlice } from './api';
import { Column as ColumnType } from '../../types/index.ts';

export const columnApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getColumn: builder.query<ColumnType, string>({
      query: (id) => `columns/${id}/`,
      providesTags: (result, error, arg) => [{ type: 'Columns', id: arg }],
    }),
    addColumn: builder.mutation<ColumnType, Partial<ColumnType>>({
      query: (data) => {
        return { url: `columns/`, method: 'Post', body: data };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Columns', id: 'LIST' },
      ],
    }),
    updateColumn: builder.mutation<ColumnType, Partial<ColumnType>>({
      query: (data) => {
        const { id, ...body } = data;

        return { url: `columns/${id}/`, method: 'PATCH', body };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Columns', id: arg.id },
      ],
    }),
    deleteColumn: builder.mutation<void, string>({
      query: (id) => {
        return { url: `columns/${id}/`, method: 'delete' };
      },
      invalidatesTags: (result, error, arg) => [
        { type: 'Columns', id: 'LIST' },
      ],
    }),
  }),
});

export const {
  useGetColumnQuery,
  useUpdateColumnMutation,
  useAddColumnMutation,
  useDeleteColumnMutation,
} = columnApi;

export const selectColumnById = (id: string) =>
  createSelector(
    columnApi.endpoints.getColumn.select(id),
    (column) => column.data
  );
