import React, { useRef, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateAndTimeInput = ({ delayTime ,selectedDate, setSelectedDate,deliveryTime, setDeliveryTime }) => {
 

  const minDate = new Date();
  const delivaryDuration = useRef(null);

  if (typeof delayTime != "number") {
    // console.log("not a number")
    delivaryDuration.current = Number(delayTime);
    // console.log(typeof delivaryDuration.current);
    minDate.setDate(minDate.getDate() + delivaryDuration.current);
  } else {
    minDate.setDate(minDate.getDate() + delayTime);
  }

//   console.log(minDate, deliveryTime);


  return (
    <div>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        minDate={minDate}
       className="h-10 resize-none w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor"
        required
      />
      <div>
        <h1>set last time:</h1>
        <input
          type="time"
          onChange={(e) => setDeliveryTime(e.target.value)}
          style={{ border: "solid 1px pink" }}
          className="h-10 resize-none w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor"
           required
        />
      </div>
    </div>
  );
};

export default DateAndTimeInput;
