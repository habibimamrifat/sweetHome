import React, { useState } from "react";
import { ButtonWhite } from "./ButtonAndText";
import PlaceAnOrder from "../Utility/PlaceAnOrder";
import CustomLoader from "../SharedComponents/CustomLoader"
import { useNavigate } from "react-router-dom";

const OrderDetail = ({ ordarDetail }) => {
  const [isLoading, setIsLoading] = useState(false); // State for loading
  // console.log("thre data is ", ordarDetail);
  const navigate = useNavigate()

  const [hours, minutes] = ordarDetail.delivery_Time.split(":").map(Number);

  const deliveryTime = new Date();
  deliveryTime.setHours(hours, minutes);

  const formattedDeliveryTime = deliveryTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const handleOrderSubmission = async (ordarDetail) => {
    setIsLoading(true); // Start loader
    try {
     const placeAOrder = await PlaceAnOrder(ordarDetail);
     if(placeAOrder.insertedId)
     {
      alert("your order successfully placed")
      navigate(`/customerhome/allOrders/${ordarDetail.customer_id}`)
     }
     else{
      alert("something went wrong placing your order")
     }
    } catch (error) {
      console.error("Failed to place order:", error.message);
    } finally {
      setIsLoading(false); // Stop loader
    }
  };

  return (
    <div>
      <div className="w-full h-auto border-[1px] border-shadowColor">
        {/* Order Details */}
        <div className="mx-3 mt-5">
          <p>Cake name : {ordarDetail.cake_Name}</p>
          <p>Cake Id : {ordarDetail.cake_id}</p>
        </div>

        <div className="mx-3 mt-5">
          <p>Order date : {ordarDetail.order_date.toLocaleDateString()}</p>
          <p>Delivary date : {ordarDetail.delivery_date.toLocaleDateString()}</p>
          <p>Delivary time : {formattedDeliveryTime}</p>
          <p>Delivary address : {ordarDetail.delivery_address}</p>
          <p>Customer phone number : {ordarDetail.customer_phoneNumber}</p>
        </div>

        <div className="mx-3 mt-5">
          <p>Cake Flavour : {ordarDetail.requared_flavour}</p>

          <div className="flex gap-1">
            <p>Requared weight : {ordarDetail.requared_weight}</p>
            <h3>Pound</h3>
          </div>

          <div>
            <div className="flex gap-2">
              <h2>Topping :</h2>
              <div className="flex gap-2 flex-wrap">
                {ordarDetail.requared_cake_topping.map((topping, index) => (
                  <p key={index}>{topping}</p>
                ))}
              </div>
            </div>

            <p>Special Requirement : {ordarDetail.Special_Requarment}</p>
          </div>

          <div className="mt-5 flex justify-around flex-wrap">
            <div>
              <h2 className="font-bold">Tk/Pound</h2>
              <p>
                {ordarDetail.price} TK / {ordarDetail.minmum_weight} Pound
              </p>
              <p>= {ordarDetail.price / ordarDetail.minmum_weight} TK/Pound</p>
            </div>

            <div>
              <h2 className="font-bold">Requared Weight</h2>
              <p>{ordarDetail.requared_weight} Pound</p>
            </div>

            <div>
              <h2 className="font-bold">Sum Total</h2>
              <p>
                ={" "}
                {(ordarDetail.price / ordarDetail.minmum_weight) *
                  ordarDetail.requared_weight}{" "}
                TK
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-10" onClick={() => handleOrderSubmission(ordarDetail)}>
        {isLoading ? (
          <CustomLoader/>
          // Display loader while processing
        ) : (
          <ButtonWhite buttonInnerText={"Confirm Order"} />
        )}
      </div>
    </div>
  );
};

export default OrderDetail;
