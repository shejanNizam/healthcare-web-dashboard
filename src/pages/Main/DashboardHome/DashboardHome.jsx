import { Skeleton } from "antd";
import { FaBasketball, FaUsers } from "react-icons/fa6";
import { GrMoney } from "react-icons/gr";
import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { useGetAllStatsQuery } from "../../../redux/features/dashboardHome/dashboardHomeApi";
import International from "../International/International";
import DashboardChart from "./DashboardChart";

export default function DashboardHome() {
  const { data } = useGetAllStatsQuery();

  return (
    <>
      <div className="space-y-2 md:space-y-4 lg:space-y-6">
        <LoaderWraperComp
          isLoading={false}
          isError={false}
          dataEmpty={false}
          loader={
            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <Skeleton active className="w-full h-full" />
              <Skeleton active className="w-full h-full" />
            </div>
          }
          className={"h-[12.02vh]"}
        >
          <div className="flex justify-around bg-secondary h-36 rounded-lg drop-shadow-xl">
            <div className="flex justify-center items-center gap-16 ">
              <div>
                <p className="text-[#5E5E5E] font-semibold xl:text-4xl">
                  Total Jobs
                </p>
                <p className="text-3xl xl:text-4xl text-primary font-bold">
                  {/* {data?.data?.totalUsers} */}
                  {"187"}
                </p>
              </div>
              {/* <FaUsers
                className={`text-primary w-12 h-12 lg:w-16 lg:h-16`}
                aria-label="Total Users"
              /> */}
            </div>
            <div className="border-4 border-primary my-4 rounded"></div>
            <div className="flex justify-center items-center gap-16 ">
              <div>
                <p className="text-[#5E5E5E] font-semibold  xl:text-4xl">
                  International Application
                </p>
                <p className="text-3xl xl:text-4xl text-primary font-bold">
                  {/* {data?.data?.totalSessions} */}
                  {"78"}
                </p>
              </div>
              {/* <FaBasketball
                className={`text-primary w-12 h-12 lg:w-16 lg:h-16`}
                aria-label="Total Users"
              /> */}
            </div>
            <div className="border-4 border-primary my-4 rounded"></div>
            <div className="flex justify-center items-center gap-16 ">
              <div>
                <p className="text-[#5E5E5E] font-semibold  xl:text-4xl">
                  Contacts
                </p>
                <p className="text-3xl xl:text-4xl text-primary font-bold">
                  {/* {data?.data?.totalEarnings} */}
                  {"87"}
                </p>
              </div>
              {/* <GrMoney
                className={`text-primary w-12 h-12 lg:w-16 lg:h-16`}
                aria-label="Total Users"
              /> */}
            </div>
          </div>
        </LoaderWraperComp>

        <div>
          <DashboardChart />
        </div>
        <div>
          <h3 className="text-primary text-3xl font-bold mb-2">
            Recent International Applications
          </h3>
          <International />
        </div>
      </div>
    </>
  );
}
