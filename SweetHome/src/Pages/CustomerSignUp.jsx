import React from "react";
import {
  TextDarkest,
  TextLight,
  TextWhite,
} from "../SharedComponents/ButtonAndText";
import PersonalInformationForm from "../SharedComponents/PersonalInformationForm";
import { useNavigate } from "react-router-dom";






const CustomerSignUp = () => {

  const navigate = useNavigate()
  
 const fireOnSubmitFunction = async (personalInfo)=>
 {
  // console.log("i am fired", personalInfo)
  // insert into mongodb from here
  const result = await fetch("http://localhost:5000/signUpPage/customerSignUp",{

    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body:JSON.stringify(personalInfo)
  })

  const responseData= await result.json() 
  
  console.log("yoo",responseData);
  if(responseData.insertedId)
  {
    //replace alart with loader
    alert("your account created")
    //replace alart with loader
    
    navigate("/customerSignIn")
  }

 }
  

  return (
    <div className="w-full pb-32">
      <div className="text-center text-2xl md:text-5xl">
        <TextWhite text={"Customer Sign Up"} />
      </div>

      <PersonalInformationForm 
      fireOnSubmit={fireOnSubmitFunction}
      placement = {"Customer"}
      />

      <div className="w-full h-12 mt-10 flex flex-col items-center">
        <div className="flex gap-4">
          <TextLight text={"Have an Account ?"} />
          <a href="/customerSignIn">
            <u>
              <TextDarkest text={"SignIn"} />
            </u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default CustomerSignUp;
