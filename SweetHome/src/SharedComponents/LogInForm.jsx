import React, { useRef,  } from 'react'
import NormalCard from './NormalCard'
import { ButtonWhiteSubmit } from './ButtonAndText'

const LogInForm = ({placement,fireOnSubmit}) => {

  const logInData = useRef({
    email:null,
    password:null
  })

  const gatherInput = (e) =>{
   const form = e.target
  const {name,value}= form
  logInData.current={
    ...logInData.current,
    [name]:value
  }
  }

const handelLogIn = (e)=>{
  e.preventDefault()
 fireOnSubmit(logInData.current)
}

  return (
    <form className=" w-[95%] lg:w-[75%] mt-5 mx-auto" onSubmit={handelLogIn}>

    <NormalCard>
      <div className="p-2 lg:p-10 flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <i>
            <h2 className="lg:text-[24px] font-semibold text-white">
              Email:
            </h2>
          </i>
          <input
          name='email'
            type="text"
            required
            className="w-[70%] lg:h-12 bg-transparent border-b-2 rounded-lg border-white text-white pl-2 outline-none font-bold italic"

            onChange={gatherInput}
          />
        </div>

        <div className="flex justify-between items-center">

          <i>
            <h2 className="lg:text-[24px] font-semibold text-white">
              Password:
            </h2>
          </i>

          <input
          name='password'
            type="text"
            required
            className="w-[70%] lg:h-12 bg-transparent border-b-2 rounded-lg border-white text-white pl-2 outline-none font-bold italic"
            
            onChange={gatherInput}
          />
        </div>

        <div type="submit" className=" w-[75%] lg:w-[25%] lg:h-12 lg:text-[24px] mx-auto mt-7 ">
          <ButtonWhiteSubmit buttonInnerText={"Log In"} />
        </div>


      </div>
    </NormalCard>


  </form>
  )
}

export default LogInForm
