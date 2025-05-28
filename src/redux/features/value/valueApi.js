import baseApi from "../../api/baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all beautician
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
    // get beautician by id
    getJobDetails: builder.query({
      query: (id) => ({
        url: `/job/single/${id}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),
    // all beautician
    getJobApplicants: builder.query({
      query: ({ id, date, page = 1, limit = 10 }) => ({
        url: `/apply/all/${id}`,
        method: "GET",
        params: {
          date,
          page,
          limit,
        },
      }),
      providesTags: ["jobs"],
    }),
    // get beautician by id
    getJobApplicantDetails: builder.query({
      query: (id) => ({
        url: `/apply/single/${id}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),

    // -------------
    postJob: builder.mutation({
      query: (jobData) => ({
        url: "/job/create",
        method: "POST",
        body: jobData,
      }),
      invalidatesTags: ["jobs"],
    }),
  }),
});

export const { useGetValueQuery } = jobsApi;
