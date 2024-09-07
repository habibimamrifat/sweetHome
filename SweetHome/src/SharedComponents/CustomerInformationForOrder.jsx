import React, { useState, useEffect } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const CustomerInformationForOrder = ({ customerData,address, setAddress,mobile, setMobile }) => {

  const [viewAddressSuggestion, setViewAddressSuggestion] = useState(true);
  const [viewMobileSuggestion, setViewMobileSuggestion] = useState(true);

  // useEffect(() => {
  //   console.log(address);
  // }, [address]);

  const handleAddressSetup = (action) => {
    if (action === "accept") {
      setAddress(customerData.address);
    }
    setViewAddressSuggestion(false);
  };

  const handleMobileSetup = (action) => {
    if (action === "accept") {
      setMobile(customerData.mob);
    }
    setViewMobileSuggestion(false);
  };

  return (
    <div className="space-y-4">
      {/* Address Section */}
      <div className="flex gap-2 items-center">
        <h1>Address:</h1>
        <div className="relative">
          <textarea
            type="text"
            name="address"
            className="h-10 resize-none w-full sm:w-64 p-2 border border-gray-300 rounded-md"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          {viewAddressSuggestion && (
            <div className="absolute inset-0 bg-white p-2 border border-gray-300 rounded-md shadow-md shadow-shadowColor overflow-hidden">
              <div className="flex gap-2 absolute top-2 right-2">
                {/* Accept and Cancel Buttons */}
                <button onClick={() => handleAddressSetup("accept")} className="text-green-500">
                  <TiTick />
                </button>
                <button onClick={() => handleAddressSetup("cancel")} className="text-red-500">
                  <MdOutlineCancel />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-700">{customerData.address}</p>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Number Section */}
      <div className="flex gap-2 items-center">
        <h1>Mobile No:</h1>
        <div className="relative">
          <textarea
            type="text"
            name="mobile"
            className="h-10 resize-none w-full sm:w-64 p-2 border border-gray-300 rounded-md"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            required
          />
          {viewMobileSuggestion && (
            <div className="absolute inset-0 bg-white p-2 border border-gray-300 rounded-md shadow-md shadow-shadowColor overflow-hidden">
              <div className="flex gap-2 absolute top-2 right-2">
                {/* Accept and Cancel Buttons */}
                <button onClick={() => handleMobileSetup("accept")} className="text-green-500">
                  <TiTick />
                </button>
                <button onClick={() => handleMobileSetup("cancel")} className="text-red-500">
                  <MdOutlineCancel />
                </button>
              </div>
              <p className="mt-2 text-sm text-gray-700">{customerData.mob}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomerInformationForOrder;
