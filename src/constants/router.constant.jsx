import { FaUsers } from "react-icons/fa";
import { GrMoney } from "react-icons/gr";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import Earnings from "../pages/Main/Earnings/Earnings";
import Notifications from "../pages/Main/Notifications/Notifications";
import Users from "../pages/Main/Users/Users";

export const dashboardItems = [
  {
    name: "Dashboard",
    path: "/",
    icon: RiDashboardHorizontalFill,
    element: <DashboardHome />,
  },
  {
    path: "notifications",
    element: <Notifications />,
  },
  {
    name: "Users",
    path: "users",
    icon: FaUsers,
    element: <Users />,
  },
  {
    name: "Earnings",
    path: "earnings",
    icon: GrMoney,
    element: <Earnings />,
  },

  //   {
  //     name: "Settings",
  //     rootPath: "settings",
  //     icon: CiSettings,
  //     children: [
  //       {
  //         name: "Profile",
  //         path: "settings/profile",
  //         icon: CiUser,
  //         element: <MyProfile />,
  //       },
  //       {
  //         path: "settings/profile/edit",
  //         element: <EditMyProfile />,
  //       },
  //       {
  //         name: "About",
  //         icon: FaServicestack,
  //         path: "settings/about",
  //         element: <About />,
  //       },
  //       {
  //         path: "settings/about/edit",
  //         element: <EditAbout />,
  //       },
  //       {
  //         name: "Terms & Services",
  //         icon: FaServicestack,
  //         path: "settings/terms-conditions",
  //         element: <TermsConditions />,
  //       },
  //       {
  //         path: "settings/terms-conditions/edit",
  //         element: <EditTermsConditions />,
  //       },
  //       {
  //         name: "Privacy Policy",
  //         icon: MdOutlineSecurityUpdateWarning,
  //         path: "settings/privacy-policy",
  //         element: <PrivacyPolicy />,
  //       },
  //       {
  //         path: "settings/privacy-policy/edit",
  //         element: <EditPrivacyPolicy />,
  //       },
  //     ],
  //   },
];
