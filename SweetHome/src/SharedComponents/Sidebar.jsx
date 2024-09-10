import React, { useContext, useEffect, useRef } from "react";
import { RxCross2 } from "react-icons/rx";
import { ButtonWhite, ButtonWhiteLink } from "./ButtonAndText";
import { UserContext } from "../PrivateRoute/PrivateRout";
import { useNavigate } from "react-router-dom";

const Sidebar = ({placement, isSideBarOpen, isSideBarOpenFunction }) => {
  // const placement = "baker";

  const mapRout = useRef();
  const navigate = useNavigate();

  const {user} = useContext(UserContext);
  // console.log(user);

  const logOutFunction = () => {
    // console.log("i am being called")
    localStorage.removeItem("sweetHomeUser");
    const checkLogOut = localStorage.getItem("sweetHomeUser");
    if (!checkLogOut) {
      navigate("/");
    } else {
      console.log("something went wrong during logout");
    }

    // LogOutFunctuon()
  };

useEffect(()=>{
  if (user && placement === "customer") {
    const customerRout = [
      {
        routName: "All Cakes",
        routHttp: "allCakes",
      },
      {
        routName: "All Shops",
        routHttp: "allShops",
      },
      {
        routName: "All Orders",
        routHttp: `allorders/${user._id}`,
      },
      {
        routName: "All Favourite",
        routHttp: `/customerhome/fevList/${user._id}`,
      },
    ];
    mapRout.current = customerRout;
  } else if (user && placement === "baker") {
    const bakerRout = [
      {
        routName: "All Cakes",
        routHttp: `/bakerhome/allCakes/${user.shopId}`,
      },
      {
        routName: "Add New Cake",
        routHttp: `/bakerhome/addCakes/${user.shopId}`,
      },
      {
        routName: "All Orders",
        routHttp: `/bakerhome/allorders/${user.shopId}`,
      },
    ];
    mapRout.current = bakerRout;
  }
},[])

  return (
    <div
      className={`absolute top-0 z-50 h-full w-80 bg-gradient-to-t from-primary to-secondary ${
        isSideBarOpen ? "translate-x-0" : "-translate-x-96"
      } transition-all duration-1000`}
      style={{
        boxShadow: "4px 0px 10px #075985",
      }}
    >
      <div className="border-[1px] rounded-full absolute top-5 right-5 p-1">
        <RxCross2
          className="text-white  text-2xl  "
          onClick={() => isSideBarOpenFunction(!isSideBarOpen)}
        />
      </div>

      <div className="w-full flex flex-col items-center mt-20 gap-y-2">
        {mapRout.current && 
        mapRout.current.map((eachRout, index) => (
          <div className="w-[60%] h-12 " key={index}>
            <ButtonWhiteLink
              buttonInnerText={eachRout.routName}
              navigationLink={eachRout.routHttp}
            />
          </div>
        ))}

        <div
          className="w-[60%] h-[48px] text-orange-400"
          onClick={logOutFunction}
        >
          <ButtonWhite buttonInnerText={"Logout"} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
