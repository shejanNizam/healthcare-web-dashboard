import { createBrowserRouter } from "react-router-dom";
import { dashboardItems } from "../constants/router.constant";
import Main from "../layouts/Main/Main";
import { routesGenerators } from "../utils/routesGenerators";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: routesGenerators(dashboardItems),
  },
  //   {
  //     path: "/auth",
  //     element: <Auth />,
  //     children: [
  //       {
  //         path: "/auth",
  //         element: <Navigate to={"/auth/sign-in"} />,
  //       },
  //       {
  //         path: "/auth/sign-in",
  //         element: (
  //           <LazyLoadFallback>
  //             <SignIn />
  //           </LazyLoadFallback>
  //         ),
  //       },
  //       {
  //         path: "/auth/forgot-password",
  //         element: (
  //           <LazyLoadFallback>
  //             <ForgotPassword />
  //           </LazyLoadFallback>
  //         ),
  //       },
  //       {
  //         path: `/auth/verify-email/:id`,
  //         element: (
  //           <LazyLoadFallback>
  //             <VerifyEmail />
  //           </LazyLoadFallback>
  //         ),
  //       },
  //       {
  //         path: "/auth/reset-password",
  //         element: (
  //           <LazyLoadFallback>
  //             <ResetPassword />
  //           </LazyLoadFallback>
  //         ),
  //       },
  //     ],
  //   },
  //   {
  //     path: "*",
  //     element: <NotFound />,
  //   },
]);

export default router;
