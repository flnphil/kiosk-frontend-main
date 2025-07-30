import React from "react";
import Navbar from "../../components/Navbar/Nabbar";
import Footer from "../../components/Footer/Footer";
import ConnectiveEvents from "../../components/ConnectiveEvents/ConnectiveEvents";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const About = () => {
  const [userStatus, setUserStatus] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        console.log("Token: ", jwtDecode(token));
        jwtDecode(token);
        setUserStatus(true);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
  }, []);

  return (
    <div className="bg-white flex flex-col items-center w-full min-h-screen">
      <div className="bg-white w-full max-w-[1920px] flex flex-col">
        <Navbar user={userStatus} />
        <ConnectiveEvents />
        <Footer />
      </div>
    </div>
  );
};

export default About;
