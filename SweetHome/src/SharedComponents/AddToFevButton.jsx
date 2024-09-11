import React, { useEffect, useState } from "react";
import { CiHeart } from "react-icons/ci";
import AddtoFavourite from "../Utility/AddtoFavourite";
import { useNavigate } from "react-router-dom";
import UserAvalable from "../Utility/UserAvalable";
import FindFevCakeList from "../Utility/FindFevCakeList";

const AddToFevButton = ({ cakeId }) => {
  const navigate = useNavigate();
  const [isfavourite, setIsFavourite]=useState(false)


  useEffect(() => {
    const isAddedtoFevList = async () => {
      const loggedUser = UserAvalable();
      
      if (loggedUser.loggedUser && !loggedUser.loggedUser.shopid)
       {
       
        const result = await FindFevCakeList(loggedUser.loggedUser._id);
        
        if (result && result.fevCakeList) 
        { 
          if (result.fevCakeList.includes(cakeId)) {
            setIsFavourite(true);
          }
        }
      } else {
        console.log("no Customer logged in");
      }
    };

    isAddedtoFevList();
  }, [cakeId]);



  return (
    <CiHeart
      className={`bg-gradient-to-tr ${isfavourite ? "from-red-800 to-red-500 ":" from-primary to-secondary"} h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-sky-500  translate-y-56 group-hover:translate-y-0 delay-150 duration-1000`}
      onClick={() => AddtoFavourite(cakeId, navigate)}
    />
  );
};

export default AddToFevButton;
