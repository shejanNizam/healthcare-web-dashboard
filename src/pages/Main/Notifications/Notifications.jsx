// import { IoIosArrowBack } from "react-icons/io";
// import { IoNotificationsOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";

// // Example data (ensure ids are unique)
// const data = [
//   {
//     id: 1,
//     text: "A beautician requested a money withdrawal",
//     timestamp: "Fri, 12:00 pm",
//   },
//   {
//     id: 2,
//     text: "A salon owner has registered now",
//     timestamp: "Fri, 1:30 pm",
//   },
//   { id: 3, text: "A client paid for confirmation", timestamp: "Fri, 2:00 pm" },
//   { id: 4, text: "A user joined the web", timestamp: "Fri, 3:15 pm" },
//   { id: 5, text: "A user joined the website", timestamp: "Fri, 4:00 pm" },
//   {
//     id: 6,
//     text: "A beautician's account was approved",
//     timestamp: "Fri, 5:45 pm",
//   },
//   {
//     id: 7,
//     text: "A salon owner updated their profile",
//     timestamp: "Fri, 6:30 pm",
//   },
//   { id: 8, text: "A client canceled a booking", timestamp: "Fri, 7:00 pm" },
//   {
//     id: 9,
//     text: "A user requested to reset their password",
//     timestamp: "Fri, 8:15 pm",
//   },
//   {
//     id: 10,
//     text: "A new service was added by a beautician",
//     timestamp: "Fri, 9:00 pm",
//   },
//   {
//     id: 11,
//     text: "A new promotional offer was added",
//     timestamp: "Fri, 9:45 pm",
//   },
//   {
//     id: 12,
//     text: "A client confirmed an appointment",
//     timestamp: "Fri, 10:30 pm",
//   },
// ];

// export default function Notifications() {
//   const navigate = useNavigate();
//   return (
//     <div className="bg-white h-auto">
//       <div className="sticky top-32 flex justify-start items-center gap-2 bg-hash rounded-t-md h-[80px] text-white text-[32px] font-bold pl-8">
//         <button onClick={() => navigate(-1)}>
//           <IoIosArrowBack />
//         </button>
//         <h2>All Notifications</h2>
//       </div>

//       <div className="ml-6">
//         {data.length === 0 ? (
//           <div className="text-center text-gray-500 mt-4">
//             No notifications available
//           </div>
//         ) : (
//           data.map((d) => (
//             <div
//               key={d.id}
//               className="flex justify-start items-center gap-4 m-4"
//             >
//               <IoNotificationsOutline className="bg-[#E8EAEF] w-[40px] h-[40px] rounded-sm text-primary p-2" />
//               <div>
//                 <p className="text-xl">{d.text}</p>
//                 <p className="text-[#989898]">{d.timestamp}</p>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import React, { useContext, useEffect } from "react";
import { IoIosNotificationsOutline } from "react-icons/io";
import { useNavigate } from "react-router-dom";

import LoaderWraperComp from "../../../Components/LoaderWraperComp";
import { cn } from "../../../lib/utils";
import { compareByCTime } from "../../../utils/impFunction";
import { useDispatch } from "react-redux";
//import { resetNotification } from "../../../redux/features/Auth/notificationSlice";
import PageHeading from "../../../Components/PageHeading";
import { useAdminNotificationQuery } from "../../../redux/features/user/userApi";
import { SocketContext } from "../../../lib/Providers/AuthProvider";

const Notifications = () => {
  const { socket } = useContext(SocketContext);
  console.log(socket, "socket--------->");
  const navigate = useNavigate();
  const dispatch = useDispatch();
 
  // Fetch notifications from API
  const { data, isLoading, isError } = useAdminNotificationQuery(undefined);
//console.log(data,"data")
  // Reset notifications on mount
  useEffect(() => {
    if (socket) {
      socket.on("notification", (data) => {
        // Handle the notification data here
        console.log("Notification received:", data);
        // Optionally, you can navigate to a specific page or show a toast notification
        // navigate("/notifications");
      });
    }
  }, []);
  // useEffect(() => {
  //   dispatch(resetNotification());
  // }, [dispatch]);

  // Assume the notifications are in data.data; adjust if needed
  const notifications = data?.data?.notifications || [];
  //console.log(notifications,"notifications")
  return (
    <div className="rounded-lg">
      <PageHeading title={"All Notifications"} />
      <LoaderWraperComp isLoading={isLoading} isError={isError} className={"h-[80vh]"}>
        <div className="py-[24px]">
          {notifications?.map((item, index) => (
            <div
              key={index}
              className="group flex items-center gap-4 px-[24px] py-4 cursor-pointer border-b border-blue-50 hover:bg-gray-100 transition-all relative"
            >
              <IoIosNotificationsOutline
                style={{ cursor: "pointer" }}
                className="border border-white w-[42px] h-[42px] rounded-lg p-1.5 shadow-sm bg-[#181F81] text-white group-hover:bg-[#b3dfc7]"
              />
              <div className="space-y-[2px]">
                <h6 className="text-lg">{item.msg}</h6>
                <small className="text-[12px] text-gray-500">
                  {compareByCTime(item.createdAt)}
                </small>
              </div>
              <div
                className={cn("absolute right-3 inset-y-0 w-fit flex items-center", {
                  hidden: !!item?.isReadable,
                })}
              >
                <div className="text-[9px] font-semibold bg-yellow-400 px-2 h-[16px] rounded-full flex items-center justify-center">
                  New
                </div>
              </div>
            </div>
          ))}
        </div>
      </LoaderWraperComp>
    </div>
  );
};

export default Notifications;