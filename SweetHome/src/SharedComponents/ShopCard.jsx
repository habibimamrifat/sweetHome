import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TextWhite } from "./ButtonAndText";
import { FaLongArrowAltRight } from "react-icons/fa";

const ShopCard = ({ Data }) => {
  const location = useLocation()
  console.log(location)
  return (
    <div
      className={`w-full sm:w-[45%] md:w-[30%] shadow-lg rounded-lg overflow-hidden h-96 group bg-gradient-to-tr from-primary to-secondary shadow-shadowColor relative`}
    >
      <img
        src={Data.bannerimg
        }
        alt=""
        className="h-full w-full object-cover"
      />

      <div className="absolute m-5 top-0 bottom-0 left-0 right-0 hover:bg-black/20 duration-200 rounded-md">
        <div className="w-full flex items-center gap-3">
          <img
            src={Data?.logoimg}
            alt="Logo not found"
            className="w-[20%] h-[20%]"
          />
          <h2 className="text-white text-[24px] break-words font-bold">
            {Data?.name}
          </h2>
        </div>

        {!Data.bannerimg && (
          <div className="w-full h-full flex justify-center">
            <span className="loading loading-dots loading-lg"></span>
          </div>
        )}

        <div className="absolute bottom-3 w-full flex justify-center">
          <Link to={`${location.pathname}/eachShop/${Data._id}`} className="w-full">
            <div className="w-[80%] h-10  bg-gradient-to-tr from-primary to-secondary shadow-md hover:shadow-shadowColor mx-auto rounded-full ">
              <div className="flex justify-center items-center text-[20px] font-bold gap-2 w-full h-full hover:scale-[1.1] duration-150">
                <TextWhite text={"Visit"} />
                <FaLongArrowAltRight className="text-white" />
              </div>
            </div>
          </Link>
        </div>


      </div>
    </div>
  );
};

export default ShopCard;
