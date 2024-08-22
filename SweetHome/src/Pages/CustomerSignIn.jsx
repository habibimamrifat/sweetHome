import React from "react";
import {TextDarkest, TextLight, TextWhite } from "../SharedComponents/ButtonAndText";

import LogInForm from "../SharedComponents/LogInForm";
import { useNavigate } from "react-router-dom";
import LogInCeck from "../Utility/LogInCeck";

const CustomerSignIn = () => {
  const navigate = useNavigate()

  const customerSignInFunction = async (LoginData)=>{
    // console.log("customerSign in",LoginData)
    const apiLink = "http://localhost:5000/customerSignIn"

    // console.log("yapsi",apiLink,LoginData)
    const LoginApproved = await LogInCeck(apiLink,LoginData)
   
    if(LoginApproved._id)
    {
      // console.log("la",LoginApproved)
      const userInfo = JSON.stringify({
        _id:LoginApproved._id,
        email:LoginApproved.email
      })
      localStorage.setItem("sweetHomeUser",userInfo)
      navigate(`/customerhome`)
    }
   else{
    console.log("User not found")
   }
  }


  return (
    <div className="w-full h-full">

      <div className="text-3xl lg:text-5xl mb-5 text-center mt-5">
        <TextWhite text={"Customer Sign In"} />
      </div>

     <LogInForm
     placement={"customerLogIn"}
     fireOnSubmit={customerSignInFunction}
     />
   
     <div className="w-full h-12 mt-10 flex flex-col items-center">

        <div className="flex gap-4">
        <TextLight
        text={"Dont Have an Account ?"}
        />
        <a href="/signUpPage/customerSignUp">
        <u>
        <TextDarkest
        text={"Signup"}/>
        </u>
        </a>
        </div>


        <div className="flex gap-4">
        <TextLight
        text={"Forgot Pasword ?"}
        />
        <a href="">
        <u>
        <TextDarkest
        text={"Reset Password"}/>
        </u>
        </a>
        </div>
       
     </div>

    </div>
  );
};

export default CustomerSignIn;
