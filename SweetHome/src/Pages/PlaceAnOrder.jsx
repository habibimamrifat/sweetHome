import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../PrivateRoute/PrivateRout";
import FindSingleCake from "../Utility/FindSingleCake";

const PlaceAnOrder = () => {
  const { cakeId } = useParams();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const navigate = useNavigate()
  // const [singleCake,setSingleCake]=useState()

  // Debugging output
  console.log("Current Path:", location.pathname);
  console.log("Cake ID:", cakeId);

  const fetchNecessaryData =async (cakeId, userId)=>{
    const singleCake = await FindSingleCake(cakeId);
    console.log("Coming from customer", singleCake);
  }

  
  useEffect(() => {
    const fetchDataForTheForm = async () => {
      // Simplified check
      if (location.pathname.includes(`/customerhome/allCakes/placeAnOrder/${cakeId}`)) 
        {
        await fetchNecessaryData(cakeId, user._id)
        } 
      else if (location.pathname.startsWith(`/allCakes/placeAnOrder/${cakeId}`))
         {
            const loggedInUser = localStorage.getItem("sweetHomeUser")
            if(loggedInUser)
            {
                if(loggedInUser.shopId)
                {
                    alert("please Create a customer account")
                    navigate("/customerSignIn")
                }
                else
                {
                    await fetchNecessaryData(cakeId, user._id)
                }
            }
            else{
                alert("Please Log into customer Id or creat a account")
                navigate("/customerSignIn")
            }
        // console.log("Coming from shop");
        } 
        else 
        {
        console.log("No matching path");
        }
    };
    fetchDataForTheForm();
  }, []);

  return <div className=" w-full h-full overflow-scroll"></div>;
};

export default PlaceAnOrder;
