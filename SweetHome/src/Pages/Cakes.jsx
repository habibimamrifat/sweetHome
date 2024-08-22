import React, { useEffect, useRef, useState } from "react";
import CustomLoader from "../SharedComponents/CustomLoader";
import CakeCard from "../SharedComponents/CakeCard";
import { useParams } from "react-router-dom";

const Cakes = (  {placement="shopPannel"}) => {
  const [AllCakes, setAllCakes] = useState([]);
  const { shopIdParam } = useParams();
  // console.log("the shopId is", shopId);
  const shopId= useRef()

  if(placement !== "shopPannel")
  {
   if(shopId)
   {
    shopId.current= shopIdParam;
   }
   else{
    const loggedUser = JSON.parse(localStorage.getItem("sweetHomeUser"))
    shopId.current=loggedUser.shopId
   }
  }
  
  const allCakeFetchUrl = useRef("http://localhost:5000")

  if(shopId.current)
  {
    allCakeFetchUrl.current = `http://localhost:5000/bakerAllCakeCollection/${shopId.current}` 
  }
  
  useEffect(() => {
    const allCakeFatch = async () => {
      try {
        const allCakes = await fetch(`${allCakeFetchUrl.current}`);
        if (allCakes.ok) {
          const cakes = await allCakes.json();
          setAllCakes(cakes);
        } else {
          console.log("SARVER DOWN");
        }
      } 
      catch(error) {
        console.log("datafetching Went wrong",error);
      }
    };
    allCakeFatch();
  }, []);

  return (
    <div className="bg-blue-50 h-full w-full overflow-scroll ">
      {AllCakes && AllCakes.length > 0 ? (
        <div className="flex justify-center flex-wrap mx-2 mt-2 gap-y-5 gap-x-5 pb-[200px]">
          {AllCakes.map((cake, index) => (
            <CakeCard placement={placement} Data={cake} key={index} />
          ))}
        </div>
      ) : (
        <CustomLoader />
      )}
    </div>
  );
};

export default Cakes;
