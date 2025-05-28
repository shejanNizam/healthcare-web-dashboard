import baseApi from "../../api/baseApi";

export const valueApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get value
    getValue: builder.query({
      query: (value) => ({
        url: `/value/all/${value}`,
        method: "GET",
        params: {
          value,
        },
      }),
      providesTags: ["value"],
    }),

    //  add
    addValue: builder.mutation({
      query: ({ value, jobData }) => ({
        url: `/value/create/${value}`,
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["value"],
    }),

    // delete
    deleteValue: builder.mutation({
      query: ({ value, id }) => ({
        url: `/value/${value}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["value"],
    }),
  }),
});

export const { useGetValueQuery, useAddValueMutation, useDeleteValueMutation } =
  valueApi;
