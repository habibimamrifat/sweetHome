import React, { useRef, useState } from "react";
import {
  TextDarkest,
  TextLight,
  TextWhite,
} from "../SharedComponents/ButtonAndText";
import PersonalInformationForm from "../SharedComponents/PersonalInformationForm";
import ShopInformationForm from "../SharedComponents/ShopInformationForm";
import { useNavigate } from "react-router-dom";

const BakerSignup = () => {
  const [isPersonalInforMationSaved, setIsPersonalInforMationSaved] =
    useState(false);
  const bakerPersonalInfoInsertedId = useRef();
  const navigate = useNavigate()

  const fireOnSaveFunctionBakerInfo = async (personalInfo) => {
    console.log("from baker personal", personalInfo);

    if (personalInfo) {
      try {
        const reasult = await fetch(
          "http://localhost:5000/signUpPage/bakerSignUp",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(personalInfo),
          }
        );
        const response = await reasult.json();
        if (response.insertedId) {
          //change this with swal
          alert("please fill up the Shop info");
          //change this with swal

          bakerPersonalInfoInsertedId.current = response.insertedId;
          setIsPersonalInforMationSaved(true);
        }
      } catch (error) {
        //change this with swal
        alert("failed to insert personal information", error);
        //change this with swal
      }
    }
  };

  const fireOnSaveFunctionBakerShopInfo = async (shopInfo) => {
     const shopInfoWithOwnerId = {
      ...shopInfo, shopOwnerId : bakerPersonalInfoInsertedId.current
     }
     console.log(shopInfoWithOwnerId)
     if(shopInfoWithOwnerId.shopOwnerId)
     {
      try{
        const result = await fetch("http://localhost:5000/signUpPage/bakerSignUp/createShop",{
          method:"POST",
          headers:{
            "Content-Type":"application/json"
          },
          body:JSON.stringify(shopInfoWithOwnerId)
        })
        const responce = await result.json()
        if(responce.insertedId)
        {
          alert("your baker account is perfectly created please log in")
          navigate("/bakerSignIn")
        }
      }
      catch(error)
      {
        console.log("shop data submetting failed",error)
      }
      
     }
  };

  return (
    <div className="w-full pb-32">
      <div className="text-center text-2xl md:text-5xl">
        <TextWhite text={"Baker Sign Up"} />
      </div>

      <div className={`${!isPersonalInforMationSaved ? "block" : "hidden"}`}>
        <PersonalInformationForm
          fireOnSubmit={fireOnSaveFunctionBakerInfo}
          placement={"Baker"}
        />
      </div>

      <div className={`${!isPersonalInforMationSaved ? "hidden" : "block"}`}>
        <ShopInformationForm fireOnSubmit={fireOnSaveFunctionBakerShopInfo} />
      </div>

      <div className="w-full h-12 mt-10 flex flex-col items-center">
        <div className="flex gap-4">
          <TextLight text={"Have an Account ?"} />
          <a href="/bakerSignIn">
            <u>
              <TextDarkest text={"SignIn"} />
            </u>
          </a>
        </div>
      </div>
    </div>
  );
};

export default BakerSignup;
