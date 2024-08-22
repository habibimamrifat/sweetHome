import React from "react";

const CustomLoader = () => {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 bg-black/20 flex justify-center items-center">
      <progress className="progress w-56 bg-blue-300"></progress>
    </div>
  );
};

export default CustomLoader;
