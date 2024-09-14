import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import FindSingleCake from "../Utility/FindSingleCake";
import { ButtonWhiteLink } from "../SharedComponents/ButtonAndText";

const SingleCakeView = ({ placement = "customer" }) => {
  const { cakeId } = useParams();
  console.log("single cake", cakeId);
  const [cakeInfo, setCakeInfo] = useState();

  useEffect(() => {
    const gatherData = async (cakeId) => {
      // console.log(cakeId)
      try {
        const singlecake = await FindSingleCake(cakeId);
        console.log(singlecake);
        setCakeInfo(singlecake);
      } catch (error) {
        console.log("error occared during fetching", error);
      }
    };
    gatherData(cakeId);
  }, []);

  return (
    <div className="w-full h-full overflow-scroll pb-[200px]">
      <div className="w-full h-[75vh]">
        <img
          src={cakeInfo?.cake_pic}
          alt=""
          className="w-full h-full object-fill"
        />
      </div>

      <div className="mt-5 mx-5">
        <p>Cake Name : {cakeInfo?.cake_Name}</p>
        <p>Cake Detail : {cakeInfo?.cakeDetail}</p>
      </div>

      <div className="flex gap-2 mx-5">
        <h2>Flavours :</h2>
        <div className="flex flex-wrap gap-2">
          {cakeInfo?.cake_flavour.map((flavour, index) => (
            <p key={index}>{flavour}</p>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mx-5">
        <h2>Topping Fruit :</h2>
        <div className="flex flex-wrap gap-2">
          {cakeInfo?.cake_topping_frouit.map((flavour, index) => (
            <p key={index}>{flavour}</p>
          ))}
        </div>
      </div>

      <div className="mx-5 ">
        <p>Cake Price : {cakeInfo?.price} TK</p>
        <p>Minmum Weight : {cakeInfo?.minmum_weight} Pound</p>
        <p>Baking Period : {cakeInfo?.deliveryWithin} days</p>
      </div>

      <div className="flex justify-between flex-wrapn gap-4 mt-5 mx-5">
        {placement !== "customer" ? (
          <ButtonWhiteLink
            navigationLink={`/bakerhome/updateCakeData/${cakeInfo?._id}`}
            buttonInnerText={"Update"}
          />
        ) : (
          <ButtonWhiteLink
            navigationLink={`/customerhome/allCakes/placeAnOrder/${cakeInfo?._id}`}
            buttonInnerText={"Order Now"}
          />
        )}
      </div>
    </div>
  );
};

export default SingleCakeView;
