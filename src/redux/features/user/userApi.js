// import { baseApi } from "../api/baseApi";

import { baseApi } from "../../api/baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // user list

    getAllUser: builder.query({
      query: ({ page = 1, limit = 10, name }) => ({
        url: `/dashboard/user-list`,
        method: "GET",
        params: {
          page,
          limit,
          name,
        },
      }),
      providesTags: ["user"],
    }),

    // Fetch currently logged-in user's data
    getUserData: builder.query({
      query: () => ({
        url: "/user/my-profile",
        method: "GET",
      }),
      providesTags: ["auth"],
    }),

    // Update user data
    updateUserData: builder.mutation({
      query: (data) => ({
        url: "/user/update",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
    adminNotification: builder.query({
      query: (args) => {
        const params = new URLSearchParams();
        if (args) {
          Object.entries(args).forEach(([key, value]) => {
            params.append(key, value);
          });
        }
        return {
          url: "notification",
          method: "GET",
          params,
        };
      },
      providesTags: ["transaction", "user"],
    }),
  }),
});

export const {
  useGetAllUserQuery,
  useGetUserDataQuery,
  useUpdateUserDataMutation,
  useAdminNotificationQuery,
} = userApi;
