// import { createElement, useState } from "react";
// import { BiLogOut } from "react-icons/bi";
// import { MdOutlineArrowRight } from "react-icons/md";

// import Swal from "sweetalert2";
// import logo from "../../assets/images/main_logo.png";

import { createElement, useState } from "react";
import { BiLogOut } from "react-icons/bi";
import { MdOutlineArrowRight } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { dashboardItems } from "../../constants/router.constant";
import { routeLinkGenerators } from "../../utils/routeLinkGenerators";
import { cn } from "../../utils/utils";

const SubMenu = ({ children, rootPath, location, openName, name }) => (
  <div
    className={cn("pl-8 pr-6 space-y-0.5 h-0 overflow-hidden", {
      "h-fit pt-1":
        name === openName?.name ||
        (location.pathname.includes(rootPath) && !openName.name),
    })}
  >
    {children?.map(({ subName, subPath, subIcon }, inx) => (
      <NavLink
        key={inx}
        to={subPath}
        className={({ isActive }) =>
          isActive
            ? "bg-primary text-white w-full px-4 py-1 flex items-center justify-start gap-3 transition-all rounded-sm"
            : "text-[#646464] hover:text-white hover:bg-primary w-full px-4 py-1 flex items-center justify-start gap-3 transition-all rounded-sm"
        }
      >
        <div>{createElement(subIcon, { size: "17" })}</div>
        <span>{subName}</span>
      </NavLink>
    ))}
  </div>
);

export default function Sidebar() {
  const location = useLocation();
  //   const navigate = useNavigate();
  const [openName, setOpenName] = useState({});

  //   const handleLogOut = () => {
  //     Swal.fire({
  //       text: "Are you sure you want to logout?",
  //       showCancelButton: true,
  //       confirmButtonText: "     Sure    ",
  //       cancelButtonText: "Cancel",
  //       showConfirmButton: true,
  //       confirmButtonColor: "#DC2626",
  //       reverseButtons: true,
  //     }).then((res) => {
  //       if (res.isConfirmed) {
  //         logout();
  //         navigate("/auth");
  //       }
  //     });
  //   };

  return (
    <>
      <div className="fixed top-0 left-0 w-[326px] min-h-screen h-full p-6 pr-0">
        <div className="h-full flex flex-col justify-between bg-white pt-[50px] border drop-shadow rounded-lg">
          {/* Logo */}
          <div className="px-[38px]">
            <img className="w-[60%] mx-auto" src={"logo"} alt="Logo" />
          </div>

          {/* Navigation Links */}
          <ul className="mt-10 max-h-[650px] overflow-y-auto space-y-1 xl:space-y-2 px-4">
            {routeLinkGenerators(dashboardItems).map(
              ({ name, icon, path, children, rootPath }, indx) =>
                children?.length ? (
                  <li key={indx} className="overflow-hidden">
                    <button
                      aria-label="Toggle submenu"
                      onClick={() =>
                        setOpenName((c) => ({
                          name: c?.name === name ? null : name,
                        }))
                      }
                      className={cn(
                        "outline-none hover:text-white hover:bg-red-500 w-full px-4 py-3 flex items-center justify-between gap-3 text-lg transition-all rounded-sm",
                        {
                          "bg-primary text-black":
                            name === openName?.name ||
                            (location.pathname.includes(rootPath) &&
                              !openName.name),
                        }
                      )}
                    >
                      <div className="flex items-center justify-start gap-3">
                        <div>{createElement(icon, { size: "20" })}</div>
                        <span>{name}</span>
                      </div>
                      <MdOutlineArrowRight
                        className={cn("text-gray-500", {
                          "rotate-90 text-white":
                            name === openName?.name ||
                            (location.pathname.includes(rootPath) &&
                              !openName.name),
                        })}
                        size={23}
                      />
                    </button>
                    <SubMenu
                      children={children}
                      isOpen={name === openName?.name}
                      rootPath={rootPath}
                      location={location}
                      openName={openName}
                      name={name}
                    />
                  </li>
                ) : (
                  <li key={indx}>
                    <NavLink
                      to={path}
                      className={({ isActive }) =>
                        isActive
                          ? "bg-red-500 text-white w-full px-4 py-3 flex items-center justify-start gap-3 text-lg transition-all rounded-lg"
                          : "hover:text-white text-[20px] hover:bg-red-500 w-full px-4 py-3 flex items-center justify-start gap-3 text-lg transition-all rounded-lg"
                      }
                    >
                      <div>{createElement(icon, { size: "20" })}</div>
                      <span>{name}</span>
                    </NavLink>
                  </li>
                )
            )}
          </ul>

          {/* Logout Button */}
          <div className="p-[24px]">
            <button
              //   onClick={handleLogOut}
              className="bg-[#E8EAEF] text-black w-full px-10 py-4 flex justify-center items-center gap-2 rounded-lg text-xl"
            >
              <BiLogOut className="text-[#FF5252]" size={20} />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
