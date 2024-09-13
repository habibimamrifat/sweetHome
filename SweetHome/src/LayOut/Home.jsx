import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../SharedComponents/Navbar'
import UserAvalable from "../Utility/UserAvalable"

const Home = () => {
  // bg-[#6C3428]
  const navigate = useNavigate()

  useEffect(() => {
    const checkUserAndNavigate = () => {
      const loggedUser = UserAvalable();
  
      if (loggedUser && loggedUser.loggedUser) {
        const { shopId } = loggedUser.loggedUser;
  
        if (shopId) {
          navigate("/bakerhome");
        } else {
          navigate("/customerhome");
        }
      } else {
        console.log("No user found viewing shop");
      }
    };
  
    checkUserAndNavigate();
  }, []);


  return (
    <div className='w-full h-[100vh] overflow-hidden max-w-[1444px] mx-auto bg-sky-200'>
        <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Home
