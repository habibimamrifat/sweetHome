import React, { useEffect, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const SignUppage = () => {

  const location = useLocation();
  // console.log(location)
  const [selectedRoute, setSelectedRoute] = useState('');

  useEffect(() => {
    if (location.pathname === '/signUpPage/customerSignUp') {
      setSelectedRoute('Customer');
    } else if (location.pathname === '/signUpPage/bakerSignUp') {
      setSelectedRoute('Baker');
    } else {
      setSelectedRoute('');
    }
  }, [location.pathname]);

  return (
    <div className="mt-5  h-full">
      <div className="flex mx-5 ">
        <Link to="/signUpPage/customerSignUp">
          <div
            className="rounded-full overflow-hidden relative"
            onClick={() => setSelectedRoute("Customer")}
          >
            <div
              className={`absolute top-0 h-full bg-gradient-to-tr from-primary to-secondary ${
                selectedRoute === "Customer" ? "w-full" : "w-0"
              } transition-all duration-500 z-0`}
            ></div>
            <h2 className="px-5 text-white relative z-10">Customer</h2>
          </div>
        </Link>

        <h2 className="text-blue-400">/</h2>

        <Link to="/signUpPage/bakerSignUp">
          <div
            className="rounded-full overflow-hidden relative"
            onClick={() => setSelectedRoute("Baker")}
          >
            <div
              className={`absolute top-0 h-full bg-gradient-to-tr from-primary to-secondary ${
                selectedRoute === "Baker" ? "w-full" : "w-0"
              } transition-all duration-500 z-0`}
            ></div>
            <h2 className="px-5 text-white relative z-10">Baker</h2>
          </div>
        </Link>
      </div>

      <div className=" mt-5 h-full overflow-hidden">
        <div className="h-full w-full overflow-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SignUppage;
