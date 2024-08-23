import React from 'react'
import LogInForm from '../SharedComponents/LogInForm'
import { TextDarkest, TextLight, TextWhite } from '../SharedComponents/ButtonAndText'
import { useNavigate } from 'react-router-dom'
import LogInCeck from '../Utility/LogInCeck'

const BakerSignIn = () => {

  const navigate= useNavigate()

  const bakerSignInFunction= async(LoginData)=>{
    
    // console.log("baker sign in",LoginData)

    const apiLink = "http://localhost:5000/bakerSignIn"

    const LoginApproved = await LogInCeck(apiLink,LoginData)
    console.log("i am baker approval", LoginApproved)

    if(LoginApproved._id)
    {
      const userInfo = JSON.stringify({
        _id:LoginApproved._id,
        email:LoginApproved.email,
        shopId:LoginApproved.shopId
      })
      localStorage.setItem("sweetHomeUser",userInfo)
      navigate(`/bakerhome`)
    }
  }
  return (
    <div className='w-full h-full'>
       <div className="text-3xl lg:text-5xl mb-5 text-center mt-5">
        <TextWhite text={"Baker Sign In"} />
      </div>

      <LogInForm
      placement={"bakerLogin"}
      fireOnSubmit={bakerSignInFunction}
      />

      <div className="w-full h-12 mt-10 flex flex-col items-center">

        <div className="flex gap-4">
        <TextLight
        text={"Dont Have an Account ?"}
        />
        <a href="/signUpPage/bakerSignUp">
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
        <a href="/">
        <u>
        <TextDarkest
        text={"Reset Password"}/>
        </u>
        </a>
        </div>
       
     </div>
    </div>
  )
}

export default BakerSignIn
