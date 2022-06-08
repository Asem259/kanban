import { apiSlice } from './api';
import { Column as ColumnType } from '../../types/index.ts';
import { boardApi } from './boardApi';
import { boardSlice } from '../store/boardSlice';

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
    updateColumn: builder.mutation<
      ColumnType,
      Pick<ColumnType, 'id' | 'title' | 'background'>
    >({
      query: (data) => {
        const { id, ...body } = data;
        return { url: `columns/${id}/`, method: 'PATCH', body };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        const board = boardSlice.getInitialState().currentBoard;

        const patchResult = dispatch(
          boardApi.util.updateQueryData('getFullBoard', board, (draft) => {
            const column = draft.columns.find((col) => col.id === args.id);
            if (column) Object.assign(column, args);
          })
        );
        try {
          await queryFulfilled;
        } catch (error) {
          patchResult.undo();
        }
      },
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
