import React from "react";
import { MenuIcon, User, Info, LogOut, ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { clearMessage } from "../../redux/users/actionCreator";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import logo from "../../assets/svgs/kiosk-logo.svg";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const Navbar = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutUser = () => {
    localStorage.removeItem("token");
    dispatch(clearMessage());
    toast.success("User logged out successfully!");
    navigate("/");
  };

  const menuItems = [
    {
      icon: <User />,
      name: "Profile",
      onClick: () => {
        navigate("/user");
      },
    },
    {
      icon: <Info />,
      name: "About us",
      onClick: () => {
        navigate("/about-us");
      },
    },
    {
      icon: <LogOut />,
      name: "Logout",
      onClick: () => logoutUser(),
    },
  ];
  return (
    <nav className="w-full py-5 bg-white rounded-2xl border-b border-[#e6e3e8] shadow-[0px_4px_14px_#00000014]">
      <div className="flex items-center justify-between mx-auto px-10 max-w-[1784px]">
        <div className="flex items-center gap-3">
          <img alt="kiosk" src={logo} />
        </div>

        <div className="flex items-center gap-[45px]">
          {user ? (
            <div className="flex items-center gap-5">
              <Button
                variant="outline"
                className="!px-6 py-4 h-12 rounded-[39px] font-normal text-[#FF0000] border-[#FF0000] text-base"
                onClick={logoutUser}
              >
                Logout
                <LogOut />
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-[15px]">
              <Button
                variant="ghost"
                className="px-10 py-4 rounded-[39px] font-normal text-[#242424] text-base"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </Button>

              <Button
                className="px-10 py-4 rounded-[39px] font-normal text-[#f7f8ff] text-base bg-gradient-to-r from-[rgba(105,65,198,1)] to-[rgba(14,165,233,1)] hover:from-[rgba(95,55,188,1)] hover:to-[rgba(4,155,223,1)]"
                onClick={() => navigate("/login")}
              >
                Log in
              </Button>
            </div>
          )}
          {user && (
            <Popover>
              <PopoverTrigger>
                <Button variant="ghost" size="icon" className="p-0">
                  <MenuIcon className="w-6 h-6" />
                </Button>
              </PopoverTrigger>
              <PopoverContent align="end">
                <div className="space-y-3">
                  {menuItems.map((item) => (
                    <div
                      className="flex items-center gap-2.5 p-2 cursor-pointer"
                      key={item.name}
                      onClick={item.onClick}
                    >
                      {item.icon}
                      <p className="text-[#121712]">{item.name}</p>
                    </div>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
