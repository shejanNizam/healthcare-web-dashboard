import { CiSettings, CiUser } from "react-icons/ci";
import { FaBasketballBall } from "react-icons/fa";
import { FaServicestack } from "react-icons/fa6";
import { MdOutlineSecurityUpdateWarning } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { TbAirConditioning } from "react-icons/tb";
import TabbedView from "../pages/Main/AddValue/TabbedView";
import AllApplicants from "../pages/Main/AllJobs/AllApplicants";
import AllApplicantsDetails from "../pages/Main/AllJobs/AllApplicantsDetails";
import AllJobs from "../pages/Main/AllJobs/AllJobs";
import JobDetails from "../pages/Main/AllJobs/JobDetails";
import Blogs from "../pages/Main/Blogs/Blogs";
import ContactList from "../pages/Main/ContactList/ContactList";
import ContactListDetails from "../pages/Main/ContactList/ContactListDetails";
import DashboardHome from "../pages/Main/DashboardHome/DashboardHome";
import International from "../pages/Main/International/International";
import InternationalApplicantDetails from "../pages/Main/International/InternationalApplicantDetails";
import JobPost from "../pages/Main/JobPost/JobPost";
import JobPostPreview from "../pages/Main/JobPost/JobPostPreview";
import Notifications from "../pages/Main/Notifications/Notifications";
import EditMyProfile from "../pages/Profile/EditMyProfile";
import MyProfile from "../pages/Profile/MyProfile";
import About from "../pages/Settings/About";
import EditAbout from "../pages/Settings/EditAbout";
import EditPrivacyPolicy from "../pages/Settings/EditPrivacyPolicy";
import EditTermsConditions from "../pages/Settings/EditTermsConditions";
import PrivacyPolicy from "../pages/Settings/PrivacyPolicy";
import TermsConditions from "../pages/Settings/TermsConditions";

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

  // {
  //   name: "Available Session",
  //   path: "available-session",
  //   icon: FaBasketballBall,
  //   element: <TabbedView />,
  // },
  {
    name: "International",
    path: "international",
    icon: PiUsersThree,
    element: <International />,
  },
  {
    path: "international/:id",
    element: <InternationalApplicantDetails />,
  },
  {
    name: "All Jobs",
    path: "all-jobs",
    icon: PiUsersThree,
    element: <AllJobs />,
  },
  {
    path: "all-jobs/:id",
    element: <JobDetails />,
  },
  {
    path: "all-jobs/all-applicants/:id",
    element: <AllApplicants />,
  },
  {
    path: "all-jobs/all-applicants/details/:id",
    element: <AllApplicantsDetails />,
  },
  {
    name: "Job Post",
    path: "job-post",
    icon: PiUsersThree,
    element: <JobPost />,
  },
  {
    path: "job-post/preview",
    element: <JobPostPreview />,
  },
  {
    name: "Add value",
    path: "add-value",
    icon: FaBasketballBall,
    element: <TabbedView />,
  },
  {
    name: "Blogs",
    path: "blogs",
    icon: PiUsersThree,
    element: <Blogs />,
  },
  {
    name: "Contact List",
    path: "contact-list",
    icon: PiUsersThree,
    element: <ContactList />,
  },
  {
    path: "contact-list/:id",
    element: <ContactListDetails />,
  },
  // {
  //   name: "Community",
  //   path: "community",
  //   icon: RiUserCommunityFill,
  //   element: <Community />,
  // },
  // {
  //   path: "community/:id",
  //   element: <GroupDetails />,
  // },
  // {
  //   path: "community/community-all-members/:id",
  //   element: <AllMember />,
  // },

  // {
  //   name: "Banner",
  //   path: "ad",
  //   icon: GiTatteredBanner,
  //   element: <Ad />,
  // },

  // {
  //   name: "Earnings",
  //   path: "earnings",
  //   icon: GrMoney,
  //   element: <EarningHistory />,
  // },
  {
    name: "Settings",
    rootPath: "settings",
    icon: CiSettings,
    children: [
      {
        name: "Profile",
        path: "settings/profile",
        icon: CiUser,
        element: <MyProfile />,
      },
      {
        path: "settings/profile/edit",
        element: <EditMyProfile />,
      },
      {
        name: "About Us",
        icon: FaServicestack,
        path: "settings/about-us",
        element: <About />,
      },
      {
        path: "settings/about-us/edit",
        element: <EditAbout />,
      },
      {
        name: "Terms & Services",
        icon: TbAirConditioning,
        path: "settings/terms-conditions",
        element: <TermsConditions />,
      },
      {
        path: "settings/terms-conditions/edit",
        element: <EditTermsConditions />,
      },
      {
        name: "Privacy Policy",
        icon: MdOutlineSecurityUpdateWarning,
        path: "settings/privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "settings/privacy-policy/edit",
        element: <EditPrivacyPolicy />,
      },
    ],
  },
];
