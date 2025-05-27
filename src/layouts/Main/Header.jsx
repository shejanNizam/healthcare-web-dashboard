import { Avatar } from "antd";
import { useNavigate } from "react-router-dom";
import profileImage from "../../assets/images/dash-profile.png";

import { useSelector } from "react-redux";

// const socket = io(`${import.meta.env.VITE_IMAGE_URL}`);

const Header = () => {
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  //notification
  return (
    <div className="w-full h-[88px] flex justify-between items-center rounded-sm py-[16px] px-[32px] bg-primary shadow-sm relative z-50">
      <div className="text-start space-y-0.5">
        <p className="text-[24px] font-medium text-white">
          {"Welcome,"} {user?.name || "Admin"}
        </p>
        <p className="text-gray-50">{"Have a nice day!"}</p>
      </div>
      <div className="flex gap-x-6">
        <></>
        <div
          onClick={(e) => navigate("/settings/profile")}
          className="flex items-center gap-2 cursor-pointer"
        >
          <Avatar
            size={52}
            icon={
              <img
                src={
                  user?.image
                    ? `${import.meta.env.VITE_IMAGE_URL}` + user?.image
                    : profileImage
                }
                alt=""
                className="w-full h-full object-cover"
              />
            }
          />
          {/* <FaAngleDown className="size-3.5 text-white" /> */}
        </div>
      </div>
    </div>
  );
};

export default Header;
