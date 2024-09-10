import React from "react";
import { useNavigate } from "react-router-dom";

const AddtoFavourite = async (cakeId,navigate) => {
  

  const loggedInUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
  // console.log("shop id",loggedInUser,loggedInUser.shopId)
  if (loggedInUser) {
    if (loggedInUser.shopId) {
      alert("please Create a customer account");
      navigate("/customerSignIn");
    } else {
      // console.log("last else is being called", loggedInUser._id);
      // console.log("no baker")
      try {
        const request = await fetch(
          `http://localhost:5000/addCakeToThefavouriteList/${loggedInUser._id}/${cakeId}`,
          {
            method: "post",
            headers: {
              "Content-Type": "Application/json",
            },
            body: JSON.stringify({
              customerId: loggedInUser._id,
              favouriteCake: cakeId,
            }),
          }
        );
        const result = await request.json();
        console.log(result);
        if(result.result.insertedId || result.result.modifiedCount)
        {
          alert(`${result.message}`)
          navigate(`/customerhome/fevList/${loggedInUser._id}`)
        }
      } catch (error) {
        console.log("clint side code error");
      }
    }
  } else {
    alert("please Create a customer account");
    navigate("/customerSignIn");
  }
};

export default AddtoFavourite;
