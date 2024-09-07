import React, { useEffect, useRef, useState } from "react";
import DateAndTimeInput from "./DateAndTimeInput";
import FlavourAndToppingSelection from "./FlavourAndToppingSelection";
import CustomerInformationForOrder from "./CustomerInformationForOrder";
import { ButtonWhiteSubmit } from "./ButtonAndText";
import OrderDetail from "./OrderDetail";

const Orderform = ({ cakeData, customerData, setOrderFromData }) => {
  const orderDetailsRef = useRef({
    shop_id: cakeData.shop_id,
    shop_owner_id: cakeData.shop_owner_id,
    cake_id: cakeData._id,
    cake_Name: cakeData.cake_Name,
    price: cakeData.price,
    status: {
      accepted: false,
      cooking: false,
      shipping: false,
      canceled: false,
    },
    cake_pic: cakeData.cake_pic,
    customer_id: customerData._id,
    order_date: new Date(),
  });

  const [minDate, setMinDate] = useState(new Date());
  const deliveryDuration = useRef(null);

  useEffect(() => {
    let duration;

    if (typeof cakeData.deliveryWithin !== "number") {
      // Convert to number if not already
      duration = Number(cakeData.deliveryWithin);
    } else {
      duration = cakeData.deliveryWithin;
    }

    deliveryDuration.current = duration;

    // Update the minDate state
    const updatedDate = new Date();
    updatedDate.setDate(updatedDate.getDate() + duration);
    setMinDate(updatedDate);
  }, [cakeData]);

  const [selectedDate, setSelectedDate] = useState(minDate);
  const [deliveryTime, setDeliveryTime] = useState(
    new Date().toLocaleTimeString()
  );

  const [flavour, setFlavour] = useState(cakeData.cake_flavour[0]);
  const [topping, setTopping] = useState([...cakeData.cake_topping_frouit]);

  const [address, setAddress] = useState("");
  const [mobile, setMobile] = useState("");

  // Use state for weight and special requirements
  const [minimumWeight, setMinimumWeight] = useState(cakeData.minmum_weight);
  const [specialRequirement, setSpecialRequirement] = useState("");

  const [viewOrderDetail, setViewOrderDetail] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "minimum_weight") {
      setMinimumWeight(value);
    } else if (name === "Special_Requarment") {
      setSpecialRequirement(value);
    }
  };

  const onSubmitGatheredOrderData = (e) => {
    e.preventDefault();

    orderDetailsRef.current = {
      ...orderDetailsRef.current,
      requared_weight: minimumWeight,
      Special_Requarment: specialRequirement,
      delivery_date: minDate,
      delivery_Time: deliveryTime,
      customer_phoneNumber: mobile,
      delivery_address: address,
      requared_cake_topping: topping,
      requared_flavour: flavour,
      minmum_weight:cakeData.minmum_weight
    };
    // console.log("i am being clicked", orderDetailsRef.current);
    setViewOrderDetail(true);
  };

  return (
    <div>
      {! viewOrderDetail && (
        <form onSubmit={onSubmitGatheredOrderData}>
          <h2 className="text-3xl font-bold mb-5">Order Form</h2>
          <div className="border-[1px] border-shadowColor p-5">
            {/* Required weight */}
            <div className="flex gap-2">
              <h2 className="text-xl">Required Weight :</h2>
              <input
                type="number"
                name="minimum_weight"
                min={cakeData.minmum_weight}
                className="h-10 resize-none w-full sm:w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor"
                required
                placeholder={cakeData.minmum_weight}
                onChange={handleInputChange}
                value={minimumWeight}
              />
              <h2 className="text-xl">Pound</h2>
            </div>

            {/* order Date and time setup */}
            <div className="flex gap-2 mt-5">
              <h2 className="text-xl">Delivery Last Date :</h2>
              <DateAndTimeInput
                delayTime={cakeData.deliveryWithin}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                setDeliveryTime={setDeliveryTime}
                setMinDate={setMinDate}
                minDate={minDate}
              />
            </div>

            {/* Flavour and topping setup */}
            <div>
              <FlavourAndToppingSelection
                cakeFlavourList={cakeData.cake_flavour}
                cakeToppingList={cakeData.cake_topping_frouit}
                flavour={flavour}
                setFlavour={setFlavour}
                topping={topping}
                setTopping={setTopping}
              />
            </div>

            {/* Special requirements */}
            <div className="flex mt-5 gap-2 items-center">
              <h2 className="text-base">Special Requirement:</h2>
              <textarea
                name="Special_Requarment"
                className="p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor bg-whitev w-[100%] lg:w-[50%]"
                onChange={handleInputChange}
                value={specialRequirement}
              />
            </div>
          </div>

          {/* Customer data */}
          <h2 className="text-3xl font-bold mt-5">Customer Data</h2>
          <div className="border-[1px] border-shadowColor p-5 mt-2">
            <CustomerInformationForOrder
              customerData={customerData}
              address={address}
              setAddress={setAddress}
              mobile={mobile}
              setMobile={setMobile}
            />
          </div>

          {/* Submit button */}
          <div className="mt-5 w-full sm:w-64 h-10 mx-auto">
            <ButtonWhiteSubmit buttonInnerText={"Place Order"} />
          </div>
        </form>
      )}


      {
      viewOrderDetail &&
       <OrderDetail ordarDetail={orderDetailsRef.current}
     />
     }
    </div>
  );
};

export default Orderform;
