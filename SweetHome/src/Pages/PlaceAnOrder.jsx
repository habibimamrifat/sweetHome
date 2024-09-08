import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../PrivateRoute/PrivateRout";
import FindSingleCake from "../Utility/FindSingleCake";
import FindSingleCustomer from "../Utility/FindSingleCustomer";
import CustomLoader from "../SharedComponents/CustomLoader.jsx"
import Orderform from "../SharedComponents/Orderform.jsx";

const PlaceAnOrder = () => {

  const { cakeId } = useParams();
  const location = useLocation();
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const [singleCakeData,setSingleCakeData]=useState()
  const [singleUserData,setSingleUserData]=useState()
  const [isLoading,setIsLoading]=useState(true)

  const [orderFromData,setOrderFromData]=useState(null)

  // Debugging output
  // console.log("Current Path:", location.pathname);
  // console.log("Cake ID:", cakeId);

  const fetchNecessaryData = async (cakeId, userId) => {
    const singleCake = await FindSingleCake(cakeId);
    setSingleCakeData(singleCake)
    const singleCustomer = await FindSingleCustomer(userId)
    setSingleUserData(singleCustomer)

    // console.log("found cake", singleCake, "found customer", singleCustomer)

    setIsLoading(false)
  };

  useEffect(() => {
    const fetchDataForTheForm = async () => {
      // Simplified check
      if (location.pathname.includes(`/customerhome/allCakes/placeAnOrder/${cakeId}`))
         {
        await fetchNecessaryData(cakeId, user._id);
        // console.log("Coming from customer");
        } 

      else if (location.pathname.startsWith(`/allCakes/placeAnOrder/${cakeId}`))
         {
          const loggedInUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
          // console.log("shop id",loggedInUser,loggedInUser.shopId)
            if (loggedInUser) 
            {
      
              if (loggedInUser.shopId) 
              {
                alert("please Create a customer account");
                navigate("/customerSignIn");
              } 
              else {
                // console.log("last else is being called", loggedInUser._id);
                // console.log("no baker")
                await fetchNecessaryData(cakeId, loggedInUser._id);
              }


            } 
            else 
            {
              alert("Please Log into customer Id or creat a account");
              navigate("/customerSignIn");
            }
            // console.log("Coming from shop");
          } 
      else {
        console.log("No matching path");
      }
    };

    
    fetchDataForTheForm();
  }, []);

  return (<div className=" w-full h-full overflow-scroll pb-[200px]">
  {
    !isLoading ?
    (
      
        (singleCakeData && singleUserData) ?
        (

          <>
            {/* cake pic Display */}
            <div className="w-full flex justify-center">
              <div className=" w-[95%] h-96 ">
                <img src={singleCakeData.cake_pic} alt="" 
                className="w-full h-full object-fit "/>
              </div>
            </div>


            {/* genarel Cake Information */}
            <div className="mx-5 mt-10">
                <div className="flex gap-2">
                  <h2 className="text-2xl font-bold">Cake Name :</h2>
                  <h2 className="text-2xl">{singleCakeData.cake_Name}</h2>
                </div>
                <div className="flex gap-2 mt-2">
                  <h2 className="text-2xl font-bold">Cake Price :</h2>
                  <h2 className="text-2xl">{singleCakeData.price} TK /</h2>
                  <h2 className="text-2xl">{singleCakeData.minmum_weight} Pound</h2>  
                </div>
                <div className="flex gap-2 mt-2">
                  <h2 className="text-2xl font-bold">Minimum Weight :</h2>
                  <h2 className="text-2xl">{singleCakeData.minmum_weight} Pound</h2>
                </div>
                <div className="flex gap-2 mt-2">
                  <h2 className="text-2xl font-bold">Min Cooking Time :</h2>
                  <h2 className="text-2xl">{singleCakeData.deliveryWithin} Days</h2>
                </div>
            </div>


            {/* order form */}
            <div className="mx-5 mt-10">
              
              <Orderform
              cakeData={singleCakeData}
              customerData={singleUserData}
              />
            </div>
          </>

        ):
        (
          <div><h1>server error occared</h1></div>
        )
      
    ):
    (
      <CustomLoader/>
    )
  }
</div>);
};

export default PlaceAnOrder;
