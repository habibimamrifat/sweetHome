import React, { useContext, useState } from 'react'
import { UserContext } from '../PrivateRoute/PrivateRout'
import Navbar from "../SharedComponents/Navbar"
import Sidebar from '../SharedComponents/Sidebar'
import { Outlet } from 'react-router-dom'

const CustomerHome = () => {
    const {user} = useContext(UserContext)
    const [isSideBarOpen, isSideBarOpenFunction]=useState(false)
    // console.log("i am ",user)
    return (
      <div className="w-full h-[100vh] overflow-hidden max-w-[1444px] mx-auto bg-sky-200 relative">
      <Navbar placement="customerHome" whoLoggedIn={user.email} 
      isSidebarOpen={isSideBarOpen}
      isSideBarOpenFunction={isSideBarOpenFunction}/>
      
      <Sidebar
      placement={"customer"}
      isSideBarOpen={isSideBarOpen}
      isSideBarOpenFunction={isSideBarOpenFunction}/>
      <Outlet />
    </div>
  )
}

export default CustomerHome
