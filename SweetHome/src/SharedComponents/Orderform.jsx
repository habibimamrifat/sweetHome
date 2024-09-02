import React, { useState } from "react";
import DateAndTimeInput from "./DateAndTimeInput";
import FlavourAndToppingSelection from "./FlavourAndToppingSelection";
import CustomerInformationForOrder from "./CustomerInformationForOrder";
import { ButtonWhiteSubmit } from "./ButtonAndText";

const Orderform = ({ cakeData, customerData, setOrderFromData }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [deliveryTime, setDeliveryTime] = useState(new Date().toLocaleTimeString());

  const [flavour, setFlavour] = useState(cakeData.cake_flavour[0]);
  const [topping, setTopping] = useState([...cakeData.cake_topping_frouit]);
  console.log(cakeData,customerData)
  return (
    <form>
      <div className="border-[1px] border-shadowColor p-5">
        {/* requared weight */}
        <div className="flex gap-2">
          <h2 className="text-xl">Required Weight :</h2>
          <input
            type="number"
            name="minmum_weight"
            min={cakeData.minmum_weight}
           className="h-10 resize-none w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor"
            required
          />
          <h2 className="text-xl">Pound</h2>
        </div>

        {/* order Date and time setUp */}
        <div className="flex gap-2 mt-5">
          <h2 className="text-xl">Delivery Last Date :</h2>
          <DateAndTimeInput
            delayTime={cakeData.deliveryWithin}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            setDeliveryTime={setDeliveryTime}
          />
        </div>

        {/* Flavour and topping setUp */}
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

        {/* special raquarment */}
        <div className="flex mt-5 gap-2 items-center">
          <h2 className="text-base">Special RequarMent:</h2>
          <textarea name="Special_Requarment" className="p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor bg-whitev w-[100%] lg:w-[50%]" />
        </div>
      </div>

      <h2 className="text-3xl font-bold mt-5">Customer Data</h2>
      <div className="border-[1px] border-shadowColor p-5 mt-2">
        <CustomerInformationForOrder
        customerData={customerData}
        />
      </div>

      {/* submit button  */}
      <div className="mt-5 w-96 h-10 mx-auto">
      <ButtonWhiteSubmit
      buttonInnerText={"Place Order"}
      />
      </div>
    </form>
  );
};

export default Orderform;
