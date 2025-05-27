import baseApi from "../../api/baseApi";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. login
    login: builder.mutation({
      query: (loginData) => ({
        url: "/user/login",
        method: "POST",
        body: loginData,
      }),
    }),
    getUserByToken: builder.query({
      query: () => ({ url: `auth/my-profile`, method: "GET" }),
      providesTags: ["auth"],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: `/auth/profile-update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // 02. forgot password
    forgotPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/forget-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 03. verify email
    verifyEmail: builder.mutation({
      query: ({ code }) => {
        return {
          url: `/auth/verify-otp`,
          method: "POST",
          // headers: { Authorization: `Bearer ${token}` },
          body: { otp: code },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 04. reset password
    resetPassword: builder.mutation({
      query: ({ password }) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          // headers: { Authorization: `Bearer ${token}` },
          body: { password: password },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 05. resend otp
    resendOtp: builder.query({
      query: (email) => ({
        // url: `/otp/resend?userId=${id}`,
        url: `/auth/resend-otp?email=${email}`,
        method: "POST",
      }),
      providesTags: ["auth"],
    }),

    // 04. reset password
    changePassword: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/change-password`,
          method: "POST",
          // headers: { Authorization: `Bearer ${token}` },
          body: data,
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 10. logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useResendOtpQuery,
  useLazyResendOtpQuery,
  useChangePasswordMutation,
  useLogoutMutation,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
} = authApi;
