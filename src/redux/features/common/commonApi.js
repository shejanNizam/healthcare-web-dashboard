import baseApi from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // DashboardHome page
    getStatistics: builder.query({
      query: (year) => ({
        url: `/profiles/statistics?year=${year}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),
    // Earning in DashboardHome page
    getEarnings: builder.query({
      query: (year) => ({
        url: `/payments/chart?year=${year}`,
        method: "GET",
        // headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["common"],
    }),

    // client page
    getAllClient: builder.query({
      query: ({ page = 1, limit = 10, name, date }) => ({
        url: "/users",
        method: "GET",
        params: {
          page,
          limit,
          name,
          date,
        },
      }),
      providesTags: ["common"],
    }),
    // all beautician
    getAllBeauticians: builder.query({
      query: ({ status, page = 1, limit = 10, name, date }) => ({
        url: `/profiles/all?status=${status}`,
        method: "GET",
        params: {
          page,
          limit,
          name,
          date,
        },
      }),
      providesTags: ["common"],
    }),
    // get beautician by id
    getBeauticianById: builder.query({
      query: (profileId) => ({
        url: `profiles/${profileId}`,
        method: "GET",
      }),
      providesTags: ["common"],
    }),

    //  approved beautician
    approvedBeautician: builder.mutation({
      query: ({ id }) => ({
        url: `/profiles/${id}`,
        method: "PUT",
      }),
    }),

    // get all category
    getAllCategory: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: "/categories",
        method: "GET",
        params: {
          page,
          limit,
        },
      }),
      providesTags: ["category"],
    }),

    //  add category
    addCategory: builder.mutation({
      query: (addCategoryData) => ({
        url: "/categories",
        method: "POST",
        body: addCategoryData,
      }),
      invalidatesTags: ["category"],
    }),

    //  edit category
    editCategory: builder.mutation({
      query: ({ categoryId, editCategoryData }) => ({
        url: `/categories/${categoryId}`,
        method: "PUT",
        body: editCategoryData,
      }),
      invalidatesTags: ["category"],
    }),
  }),
});

export const {
  useGetStatisticsQuery,
  useGetEarningsQuery,
  useGetAllClientQuery,
  useGetAllBeauticiansQuery,
  useGetBeauticianByIdQuery,
  useApprovedBeauticianMutation,
  useGetAllCategoryQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
} = userApi;
