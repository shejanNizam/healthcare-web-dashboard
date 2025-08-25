import baseApi from "../../api/baseApi";

export const stuffApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // get stuff
    getStuff: builder.query({
      query: () => ({
        url: `/staffing/all`,
        method: "GET",
      }),
      providesTags: ["stuff"],
    }),

    //  get single stuff
    getSingleStuff: builder.query({
      query: ({ id }) => ({
        url: `/staffing/${id}`,
        method: "GET",
      }),
      providesTags: ["stuff"],
    }),

    // get value
    // getValue: builder.query({
    //   query: (value) => ({
    //     url: `/value/all/${value}`,
    //     method: "GET",
    //     // params: {
    //     //   value,
    //     // },
    //   }),
    //   providesTags: ["value"],
    // }),

    //  add
    addStuff: builder.mutation({
      query: ({ jobData }) => ({
        url: `/staffing/create`,
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["stuff"],
    }),
    //  update
    updateStuff: builder.mutation({
      query: ({ id, jobData }) => ({
        url: `/staffing/update/${id}`,
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["stuff"],
    }),

    // delete
    // deleteValue: builder.mutation({
    //   query: ({ id }) => ({
    //     url: `/value/delete/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["value"],
    // }),
  }),
});

export const {
  useGetStuffQuery,
  useGetSingleStuffQuery,
  useAddStuffMutation,
  useUpdateStuffMutation,
} = stuffApi;
