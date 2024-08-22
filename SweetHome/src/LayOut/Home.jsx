import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../SharedComponents/Navbar'

const Home = () => {
  // bg-[#6C3428]
  return (
    <div className='w-full h-[100vh] overflow-hidden max-w-[1444px] mx-auto bg-sky-200'>
        <Navbar/>
      <Outlet/>
    </div>
  )
}

export default Home
