import baseApi from "../../api/baseApi";

export const jobsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all beautician
    getJobs: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/job/all`,
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["jobs"],
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
        url: `//${id}`,
        method: "GET",
      }),
      providesTags: ["jobs"],
    }),
  }),
});

export const { useGetJobsQuery, useGetJobDetailsQuery } = jobsApi;
