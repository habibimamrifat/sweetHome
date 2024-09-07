import React from "react";

const OrderDetail = ({ ordarDetail }) => {

  console.log("thre data is ",ordarDetail)


  const [hours, minutes] = ordarDetail.delivery_Time.split(":").map(Number);

  // Create a new Date object and set the hours and minutes
  const deliveryTime = new Date();
  deliveryTime.setHours(hours, minutes);

  // Format the time in 12-hour format with AM/PM
  const formattedDeliveryTime = deliveryTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });


  return (
    <div className="w-full h-auto border-[1px] border-shadowColor">
      <div>
        <p>Cake name : {ordarDetail.cake_Name}</p>
        <p>Cake Id : {ordarDetail.cake_id}</p>
      </div>

      <div className="mt-5">
        <p>Order date : {ordarDetail.order_date.toLocaleDateString()}</p>
        <p>Delivary date : {ordarDetail.delivery_date.toLocaleDateString()}</p>
        <p>Delivary time : {formattedDeliveryTime}</p>
        <p>Delivary address : {ordarDetail.delivery_address}</p>
      </div>

      <div className="mt-5">
        <p>Cake Flavour : {ordarDetail.requared_flavour}</p>

        <div className="flex gap-1">
          <p>Requared weight : {ordarDetail.requared_weight}</p>
          <h3>Pound</h3>
        </div>

        <div>
          <div className="flex gap-2">
          <h2>Topping :</h2>
          <div className="flex gap-2 flex-wrap">{ordarDetail.requared_cake_topping.map((topping) => (
            <p>{topping}</p>
          ))}</div>
          </div>

          <p>Special Requarment : {ordarDetail.Special_Requarment}</p>
        </div>

        <div className="mt-5 flex justify-around flex-wrap">
          <div>
            <h2 className="font-bold">Tk/Pound</h2>
            <p>{ordarDetail.price} TK / {ordarDetail.minmum_weight} Pound</p>
            <p>= {ordarDetail.price / ordarDetail.minmum_weight} TK/Pound</p>
          </div>

          <div>
            <h2 className="font-bold">Requared Weight</h2>
            <p>{ordarDetail.requared_weight} Pound</p>
          </div>

          <div>
            <h2 className="font-bold">Sum Total</h2>
            <p>= {(ordarDetail.price / ordarDetail.minmum_weight)*ordarDetail.requared_weight} TK</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
