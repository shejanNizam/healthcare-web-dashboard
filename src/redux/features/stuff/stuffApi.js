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

    //  add faq
    addFaq: builder.mutation({
      query: ({ stuffId, param, body }) => {
        return {
          url: `/staffing/FQA/${stuffId}?add=${param}`,
          method: `PATCH`,
          body,
        };
      },
      invalidatesTags: ["stuff"],
    }),

    // delete
    deleteFaq: builder.mutation({
      query: ({ stuffId, faqId }) => ({
        url: `/staffing/FQA/${stuffId}?pull=${faqId}`,
        method: "PATCH",
      }),
      invalidatesTags: ["stuff"],
    }),
  }),
});

export const {
  useGetStuffQuery,
  useGetSingleStuffQuery,
  useAddStuffMutation,
  useUpdateStuffMutation,
  //   faq
  useAddFaqMutation,
  useDeleteFaqMutation,
  //   what we do
} = stuffApi;
