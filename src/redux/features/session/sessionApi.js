import baseApi from "../../api/baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // all session
    getAllSession: builder.query({
      query: ({ type, page = 1, limit = 10, date }) => ({
        url: `/dashboard/session-list?type=${type}`,
        method: "GET",
        params: {
          page,
          limit,
          date,
        },
      }),
      providesTags: ["session"],
    }),
  }),
});

export const { useGetAllSessionQuery } = sessionApi;
