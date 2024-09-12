import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../PrivateRoute/PrivateRout";
import FindSingleCake from "../Utility/FindSingleCake";
import FindSingleCustomer from "../Utility/FindSingleCustomer";
import CustomLoader from "../SharedComponents/CustomLoader.jsx";
import Orderform from "../SharedComponents/Orderform.jsx";

const PlaceAnOrder = () => {
  const { cakeId } = useParams();
  const location = useLocation();
  const { user } = useContext(UserContext) || {};
  const navigate = useNavigate();

  const [singleCakeData, setSingleCakeData] = useState();
  const [singleUserData, setSingleUserData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const fetchNecessaryData = async (cakeId, userId) => {
    try {
      const singleCake = await FindSingleCake(cakeId);
      setSingleCakeData(singleCake);
      const singleCustomer = await FindSingleCustomer(userId);
      setSingleUserData(singleCustomer);
    } catch (error) {
      console.error("Error fetching data:", error);
      alert("An error occurred while fetching data.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataForTheForm = async () => {
      
        const loggedInUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
        if (loggedInUser) 
          {
          if (loggedInUser.shopId) {
            alert("Please create a customer account.");
            navigate("/customerSignIn");
          } 
          else 
          {
            await fetchNecessaryData(cakeId, loggedInUser._id);
          }
        } 
        else 
        {
          alert("Please log into customer ID or create an account.");
          navigate("/customerSignIn");
        }
       
    
     
    };

    fetchDataForTheForm();
  }, [location, cakeId, user, navigate]);

  return (
    <div className="w-full h-full overflow-scroll pb-[200px]">
      {!isLoading ? (
        singleCakeData && singleUserData ? (
          <>
            {/* Cake pic display */}
            <div className="w-full flex justify-center">
              <div className="w-[95%] h-96">
                <img src={singleCakeData.cake_pic} alt="" className="w-full h-full object-fit" />
              </div>
            </div>

            {/* General Cake Information */}
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

            {/* Order form */}
            <div className="mx-5 mt-10">
              <Orderform cakeData={singleCakeData} customerData={singleUserData} />
            </div>
          </>
        ) : (
          <div>
            <h1>Server error occurred</h1>
          </div>
        )
      ) : (
        <CustomLoader />
      )}
    </div>
  );
};

export default PlaceAnOrder;
