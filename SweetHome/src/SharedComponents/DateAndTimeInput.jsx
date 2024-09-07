import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateAndTimeInput = ({selectedDate, setSelectedDate, setDeliveryTime,minDate,setMinDate }) => {

  return (
    <div>
      <DatePicker
        selected={minDate}
        onChange={(date) => setMinDate(date)}
        minDate={minDate}
       className="h-10 resize-none w-full sm:w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor"
        required
      />
      <div>
        <h1>set last time:</h1>
        <input
          type="time"
          onChange={(e) => setDeliveryTime(e.target.value)}
          style={{ border: "solid 1px pink" }}
          className="h-10 resize-none w-full sm:w-64 p-2 border border-gray-300 rounded-md shadow-sm shadow-shadowColor"
           required
        />
      </div>
    </div>
  );
};

export default DateAndTimeInput;
