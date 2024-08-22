import React, { useContext, useState } from "react";
import { UserContext } from "../PrivateRoute/PrivateRout";
import Navbar from "../SharedComponents/Navbar";
import { Outlet } from "react-router-dom";
import Sidebar from "../SharedComponents/Sidebar";

const BakerHome = () => {
  const {user} = useContext(UserContext);
  // console.log(user);
  const [isSideBarOpen, isSideBarOpenFunction]=useState(false)

  return (
    <div className="w-full h-[100vh] overflow-hidden max-w-[1444px] mx-auto bg-sky-200 relative">
      <Navbar placement="bakerHome" whoLoggedIn={user.email} 
      isSidebarOpen={isSideBarOpen}
      isSideBarOpenFunction={isSideBarOpenFunction}/>
      
      <Sidebar
      isSideBarOpen={isSideBarOpen}
      isSideBarOpenFunction={isSideBarOpenFunction}/>
      <Outlet />
    </div>
  );
};

export default BakerHome;
