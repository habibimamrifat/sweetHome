import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../PrivateRoute/PrivateRout";
import Navbar from "../SharedComponents/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../SharedComponents/Sidebar";

const BakerHome = () => {
  const {user} = useContext(UserContext);
  // console.log(user);
  const [isSideBarOpen, isSideBarOpenFunction]=useState(false)
  const navigate = useNavigate()
  useEffect(()=>{
    navigate(`allCakes/${user.shopId}`)
  },[])
 

  return (
    <div className="w-full h-[100vh] overflow-hidden max-w-[1444px] mx-auto bg-sky-200 relative">
      <Navbar placement="bakerHome" whoLoggedIn={user.email} 
      isSidebarOpen={isSideBarOpen}
      isSideBarOpenFunction={isSideBarOpenFunction}/>
      
      <Sidebar
      placement={"baker"}
      isSideBarOpen={isSideBarOpen}
      isSideBarOpenFunction={isSideBarOpenFunction}/>
      <Outlet />
    </div>
  );
};

export default BakerHome;
