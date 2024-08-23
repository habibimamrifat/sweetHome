import React from "react";
import { IoPersonCircle } from "react-icons/io5";
import { Link } from "react-router-dom";
import { GiCakeSlice } from "react-icons/gi";
import { TextWhite } from "./ButtonAndText";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = ({
  placement = "home",
  whoLoggedIn,
  isSidebarOpen = null,
  isSideBarOpenFunction = null,
}) => {
  return (
    <div className="w-full h-20 bg-gradient-to-tr from-primary to-secondary flex justify-center items-center">
      <div className="w-full mx-[2%] flex justify-around items-center">
        {placement === "home" ? (
          <div className="relative group/signIn">
            <IoPersonCircle className="text-[25px] text-white " />

            <div className="absolute top-[25px] h-0 overflow-hidden group-hover/signIn:h-auto group-hover/signIn:p-5 bg-gradient-to-tr from-primary to-secondary z-50 rounded-md shadow-md shadow-shadowColor transition-all duration-100">
              <Link to="/customerSignIn">
                <div className="hover:scale-[1.1] hover:border-[1px] hover:border-white p-2 rounded-md">
                  <TextWhite text={"Customer log In"} />
                </div>
              </Link>

              <Link to="/bakerSignIn">
                <div className="hover:scale-[1.1] hover:border-[1px] hover:border-white p-2 rounded-md">
                  <TextWhite text={"Baker log In"} />
                </div>
              </Link>
            </div>
          </div>
        ) : placement === "customerHome" || placement === "bakerHome" ? (
          <div className="text-white flex gap-5 items-center">
            <div>
              <GiHamburgerMenu
                onClick={() => isSideBarOpenFunction(!isSidebarOpen)}
              />
            </div>
            <div className="w-max-[30%] text-white overflow-hidden">
              <h2 className="break-words w-full">{whoLoggedIn}</h2>
            </div>
          </div>
        ) : null}

        <div className="flex justify-around items-center w-[70%]">
          {placement === "home" ? (
            <>
              <Link to="/signUpPage">
                <div className="hover:scale-[1.1] px-2 hover:border-[1px] rounded-md border-white flex justify-center items-center">
                  <TextWhite text={"Signup"} />
                </div>
              </Link>
              <Link to="/allCakes">
                <div className="hover:scale-[1.1] px-2 hover:border-[1px] rounded-md border-white flex justify-center items-center">
                  <TextWhite text={"Cakes"} />
                </div>
              </Link>

              <Link to="/allShops">
                <div className="hover:scale-[1.1] px-2 hover:border-[1px] rounded-md border-white flex justify-center items-center">
                  <TextWhite text={"Shops"} />
                </div>
              </Link>
            </>
          ) : null}
        </div>

        <Link to="/">
          <div className="text-[25px] text-white">
            <GiCakeSlice />
            <h2 className="text-[12px]">
              Sweet <br /> Home
            </h2>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
