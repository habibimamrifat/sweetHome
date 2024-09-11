import React, { useEffect, useRef, useState } from "react";
import CustomLoader from "../SharedComponents/CustomLoader";
import CakeCard from "../SharedComponents/CakeCard";
import { useParams } from "react-router-dom";

const Cakes = ({ placement = "shopPannel" }) => {
  const [AllCakes, setAllCakes] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [reload,setReload]=useState(true)

  const { shopId } = useParams();
  console.log("the shopId is", shopId);

  const shopIdRef = useRef();
  const allCakeFetchUrl = useRef("http://localhost:5000");

  if (placement === "bakerCakeCollectionPanel" && shopId) 
  {
    const loggedUser = JSON.parse(localStorage.getItem("sweetHomeUser"));
    shopIdRef.current = loggedUser.shopId;

    console.log("I am triggered");

    allCakeFetchUrl.current = `http://localhost:5000/bakerAllCakeCollection/${shopIdRef.current}`;
  }

  useEffect(() => {
    const allCakeFetch = async () => {
      try {
        const response = await fetch(`${allCakeFetchUrl.current}`);
        if (response.ok) {
          const cakes = await response.json();
          setAllCakes(cakes);
        } else {
          console.log("SERVER DOWN");
        }
      } catch (error) {
        console.log("Data fetching went wrong", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
        setReload(false)
      }
    };
    if(reload)
    {
      allCakeFetch();
    }
    
  }, [reload]);

  return (
    <div className="bg-blue-50 h-full w-full overflow-scroll">
      {
      loading ? 
      (
        <CustomLoader />
      ) 
      : 
      AllCakes && AllCakes.length > 0 ? 
      (
        <div className="flex justify-center flex-wrap mx-2 mt-2 gap-y-5 gap-x-5 pb-[200px]">
          {AllCakes.map((cake, index) => 
          (
            <CakeCard placement={placement} Data={cake} key={index}
            setReload={setReload} />
          ))}
        </div>
      ) 
      : 
      (
        <h2>No cakes yet</h2>
      )}
    </div>
  );
};

export default Cakes;
