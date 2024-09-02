import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { RxCross2 } from "react-icons/rx";

const FlavourAndToppingSelection = ({ cakeFlavourList, cakeToppingList,flavour, setFlavour,topping, setTopping }) => {
  
  const handleFlavourSelection = (e) => {
    setFlavour(e.target.value);
  };

  const handleToppingToggle = (selectedTopping) => {
    if (topping.includes(selectedTopping)) {
      // Remove the topping if already selected
      setTopping(
        topping.filter((eachTopping) => eachTopping !== selectedTopping)
      );
    } else {
      // Add the topping if not selected
      setTopping([...topping, selectedTopping]);
    }
  };
  return (
    <div>
      <div className="flex gap-2 mt-5">
        <h2 className="text-xl">Select Flavour :</h2>

        <select onChange={handleFlavourSelection} className="h-10 resize-none w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor">
          {cakeFlavourList.map((eachFlavour, index) => (
            <option key={index} value={eachFlavour}>
              {eachFlavour}
            </option>
          ))}
        </select>
        <h2>{flavour}</h2>
      </div>

      <div className="flex gap-2 mt-5">
        <h2 className="text-xl">Customize Topping :</h2>

        <div className="flex gap-2 flex-wrap">
          {cakeToppingList.map((eachTopping, index) => (
            <div
              key={index}
              onClick={() => handleToppingToggle(eachTopping)}
              className="p-2 cursor-pointer"
            >
              <h2 className="flex gap-2 items-center h-10 resize-none w-36 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor bg-white">
                {topping.includes(eachTopping) ? <TiTick /> : <RxCross2 />}
                {eachTopping}
              </h2>
            </div>
          ))}
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <h2 className="text-xl">Selected Toppings:</h2>
        <div className="flex gap-2 flex-wrap">
          {topping.length > 0 ? (
            topping.map((eachTopping, index) => (
              <h2 key={index} className="flex gap-2 items-center h-10 resize-none w-36 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor">{eachTopping}</h2>
            ))
          ) : (
            <h2 className="flex gap-2 items-center h-10 resize-none w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor bg-white">
              ( ! No topping will be added )
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlavourAndToppingSelection;
