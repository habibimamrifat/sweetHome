import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../PrivateRoute/PrivateRout";
import Navbar from "../SharedComponents/Navbar";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../SharedComponents/Sidebar";
import { useRef } from "react";

const BakerHome = () => {
  const {user} = useContext(UserContext);
  // console.log(user);
  const [isSideBarOpen, isSideBarOpenFunction]=useState(false)
  const navigate = useNavigate()

  const count=useRef(0)

  useEffect(()=>{

    const navigateTo =()=>{
      if(count.current < 1)
      {
        navigate(`allCakes/${user.shopId}`)
        count.current= count.current + 1
      }
    }
    navigateTo()
   
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
