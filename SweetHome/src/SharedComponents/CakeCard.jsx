import React from "react";
import { ButtonCancel, ButtonWhiteLink } from "./ButtonAndText";
import {
  BakerCakeCollectionPannelButtonSet,
  BakerOrderPnelButtonSet,
  CustomerOrderPanelButtonSet,
  ShopPannelButtonSet,
  SingleShopCakePannel,
} from "./CardButtonSet";
import UpdateOrder from "../Utility/UpdateOrder";

const CakeCard = ({ placement, Data, setReload }) => {
  const isCanceled = Data?.status?.canceled || false;
  // console.log("cake card is canceled",isCanceled)
  // console.log("cake card placement",placement)


  return (
    <div
      className={`w-full sm:w-[45%] md:w-[30%] shadow-lg shadow-shadowColor rounded-lg overflow-hidden h-96 group ${
        (placement === "customerOrderPannel" && isCanceled)
        || (placement === "bakerOrderPannel" && isCanceled)
          ? "bg-red-600"
          : "bg-gradient-to-tr from-primary to-secondary"
      } ${
        (placement === "bakerOrderPannel" ||
          placement === "customerOrderPannel") &&
        "h-[475px]"
      }`}
    >
      <div className="h-[70%] w-[90%] mt-2 rounded-md overflow-hidden flex justify-center mx-auto relative">
        <img
          src={Data.cake_pic}
          alt="img not found"
          className="h-full w-full object-cover"
        />

        <div
          className={`absolute bottom-0 h-16 w-full bg-[#803D3B]/20 ${
            placement !== " customerOrderPannel" &&
            "translate-y-full group-hover:-translate-y-0 duration-500"
          }  overflow-hidden`}
        >
          {{

            shopPannel: (
            <ShopPannelButtonSet
            Data={Data} 
            setReload={setReload}
            />
            ),

            singleShopCakePannel: (
            <SingleShopCakePannel
            Data={Data} 
            setReload={setReload}
            />
            ),

            customerOrderPannel: (
              <CustomerOrderPanelButtonSet Data={Data}
              isCanceled={isCanceled}
              setReload={setReload} />
            ),

            bakerOrderPannel: (
              <BakerOrderPnelButtonSet
                Data={Data}
                isCanceled={isCanceled}
                setReload={setReload}
              />
            ),

            bakerCakeCollectionPanel: (
              <BakerCakeCollectionPannelButtonSet
               Data={Data} 
               setReload={setReload}
               />
            ),

          }[placement] || null}
        </div>
      </div>

      
      
      {/* bottom section of the card............. */}
      <div className="text-[24px] h-full w-full text-center">

        <h2 className="mx-auto text-white italic">{Data.cake_Name}</h2>
        <h2>
          <span className="text-white font-bold text-2xl">{Data.price}</span> Tk
        </h2>

        {/*for baker all orders collection  */}
        <div
          className={`${
            placement === "bakerOrderPannel" ? "block" : "hidden"
          } text-sm`}
        >
          <div className="flex justify-between mx-2">

            <div className="w-[50%] text-white">
            {/* <h2>Order Date: {Data?.order_date}</h2> */}
            <h2>Delivery Date: <br /> 
            <span className="font-bold">{Data?.delivery_date}</span></h2>
            </div>

            <div className="w-[50%]">
            <ButtonWhiteLink
            buttonInnerText={"view Detail"}
            navigationLink={`/bakerhome/baker/viewSingleOrder/${Data._id}`}/>
            </div>

          </div>
        </div>

        {/*for Customer all orders collection  */}
        <div
          className={`${
            placement === "customerOrderPannel" ? "block" : "hidden"
          } text-sm`}
        >
          <div className="w-[80%] mx-auto h-10 pb-2"onClick={() => UpdateOrder(setReload, Data._id, "canceled")}>
            <ButtonCancel buttonInnerText={"Cancel"} />
          </div>
        </div>

      </div>
    </div>
  );
};
export default CakeCard;
