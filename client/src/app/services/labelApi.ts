import { createLabel, Label } from '../../types/index.ts';
import { apiSlice } from './api';

export const labelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addLabel: builder.mutation<Label, Partial<createLabel>>({
      query: (data) => {
        return { url: `labels/`, method: 'POST', body: data };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Labels', id: 'LIST' }],
    }),
    deleteLabel: builder.mutation<void, string>({
      query: (id) => {
        return { url: `labels/${id}/`, method: 'DELETE' };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Labels', id: arg }],
    }),
    updateLabel: builder.mutation<Label, Partial<Label>>({
      query: (data) => {
        const { id, ...body } = data;
        return { url: `labels/${id}/`, method: 'PATCH', body };
      },
      invalidatesTags: (result, error, arg) => [{ type: 'Labels', id: arg.id }],
    }),
  }),
});

export const {
  useUpdateLabelMutation,
  useAddLabelMutation,
  useDeleteLabelMutation,
} = labelApi;
