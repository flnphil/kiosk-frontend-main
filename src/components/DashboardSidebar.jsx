import {
  LayoutDashboard,
  Settings,
  LogOut,
  Wallet,
  Search,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "../components/ui/sidebar";

import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { clearMessage } from "./../redux/users/actionCreator";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext"; // <-- Import this!

const userNavItems = [
  {
    title: "Dashboard",
    url: "/user",
    icon: LayoutDashboard,
  },
  {
    title: "Discover Events",
    url: "/home",
    icon: Search,
  },
  {
    title: "My Wallet",
    url: "/user/wallet",
    icon: Wallet,
  },
  {
    title: "Settings",
    url: "/user/settings",
    icon: Settings,
  },
];

export function DashboardSidebar() {
  const dispatch = useDispatch();
  const { name } = useUser();
  const navigate = useNavigate();
  const [userName, setUserName] = useState("User");
  const [userId, setUserId] = useState(null);

  const handleSignOut = () => {
    localStorage.removeItem("token");
    dispatch(clearMessage());
    toast.success("User logged out successfully!");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const id = decoded.user_id;
        setUserId(id);

        axios
          .get(`${process.env.REACT_APP_BACKEND_API_URL}/user/${id}`)
          .then((res) => {
            if (res.data.success && res.data.user?.name) {
              setUserName(res.data.user.name);
            }
          })
          .catch((err) => {
            console.error("Failed to fetch user name", err);
          });
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <Sidebar>
      <SidebarHeader className="bg-sidebar">
        <div className="flex items-center gap-2 p-4">
          <div className="flex items-center gap-2 flex-1">
            <Avatar className="h-10 w-10 border-2 border-purple-200">
              <AvatarFallback className="bg-purple-500 text-white">
                {userName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="text-sm font-medium">Hello, {name}</p>
              <p className="text-xs text-muted-foreground">User Account</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={handleSignOut}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          <SidebarGroupLabel>User Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {userNavItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="flex gap-3 items-center">
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
