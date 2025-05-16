import baseApi from "../../api/baseApi";

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // about  start
    getAbout: builder.query({
      query: () => ({
        url: "/about",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),

    updateAbout: builder.mutation({
      query: ({ data }) => ({
        url: `/about/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),

    // about  end

    //  terms start
    getTerms: builder.query({
      query: () => ({
        url: "/terms",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),

    updateTerms: builder.mutation({
      query: ({ data }) => ({
        url: `/terms/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
    //  terms end

    // privacy start
    getPrivacy: builder.query({
      query: () => ({
        url: "/privacy",
        method: "GET",
      }),
      providesTags: ["settings"],
    }),

    updatePrivacy: builder.mutation({
      query: ({ data }) => ({
        url: `/privacy/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["settings"],
    }),
  }),
});

export const {
  useGetAboutQuery,
  useUpdateAboutMutation,
  useGetTermsQuery,
  useUpdateTermsMutation,
  useGetPrivacyQuery,
  useUpdatePrivacyMutation,
} = settingsApi;
