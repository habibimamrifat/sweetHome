import React from "react";
import { LiaShippingFastSolid } from "react-icons/lia";
import { PiCookingPotLight, PiHandshakeThin } from "react-icons/pi";
import { RxCross1 } from "react-icons/rx";
import UpdateOrder from "../Utility/UpdateOrder";
import { Link } from "react-router-dom";
import { CiEdit, CiHeart, CiShop, CiShoppingCart, CiZoomIn } from "react-icons/ci";
import { MdDeleteForever } from "react-icons/md";



const BakerOrderPnelButtonSet = ({ setReload,isCanceled, Data }) => {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      {isCanceled ? (
        <div>Got Canceled</div>
      ) : (
        <>
          <PiHandshakeThin
            className={`h-[60%] w-1/5 text-xl rounded-xl text-white border-2   translate-y-56 group-hover:translate-y-0 delay-0 duration-1000 bg-gradient-to-tr
                    ${
                      Data.status.accepted
                        ? "from-successPrimary to-successSecondary"
                        : " frohover:border-sky-500m-primary to-secondary"
                    }`}
            onClick={() => UpdateOrder(setReload, Data._id, "accepted")}
          />

          <PiCookingPotLight
            className={`h-[60%] w-1/5 text-xl rounded-xl text-white border-2   translate-y-56 group-hover:translate-y-0 delay-100 duration-1000 bg-gradient-to-tr
                        ${
                          Data.status.cooking
                            ? "from-successPrimary to-successSecondary"
                            : "hover:border-sky-500 from-primary to-secondary"
                        }`}
            onClick={() => UpdateOrder(setReload, Data._id, "cooking")}
          />

          <LiaShippingFastSolid
            className={`h-[60%] w-1/5 text-xl rounded-xl text-white border-2   translate-y-56 group-hover:translate-y-0 delay-150 duration-1000 bg-gradient-to-tr
                        ${
                          Data.status.shipping
                            ? "from-successPrimary to-successSecondary"
                            : "hover:border-sky-500 from-primary to-secondary"
                        }`}
            onClick={() => UpdateOrder(setReload, Data._id, "shipping")}
          />

          <RxCross1
            className="bg-gradient-to-tr from-orange-700 to-orange-400 h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-red-400  translate-y-56 group-hover:translate-y-0 delay-200 duration-1000"
            onClick={() => UpdateOrder(setReload, Data._id, "canceled")}
          />
        </>
      )}
    </div>
  );
}


const BakerCakeCollectionPannelButtonSet = ({Data})=>{
    return(
        <div className="w-full h-full flex justify-center items-center gap-2">
                <Link
                  to={`/bakerhome/updateCakeData/${Data._id}`}
                  className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-sky-500  translate-y-56 group-hover:translate-y-0 delay-0 duration-1000"
                >
                  <CiEdit className="w-full h-full" />
                </Link>

                <Link
                  to={`/bakerhome/updateCakeData/${Data._id}`}
                  className="bg-gradient-to-tr from-orange-700 to-orange-400 h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-sky-500  translate-y-56 group-hover:translate-y-0 delay-0 duration-1000"
                >
                  <MdDeleteForever className="w-full h-full" />
                </Link>
              </div>
    )
}


const ViewSingleOrderButtonset =({setReload , order})=>{
  return(
    <div className='w-full h-20 mt-10 flex justify-center'>
        <PiHandshakeThin
      className={`h-[60%] w-1/5 text-xl rounded-xl text-white border-2    bg-gradient-to-tr
              ${
                order.status.accepted
                  ? "from-successPrimary to-successSecondary"
                  : " frohover:border-sky-500m-primary to-secondary"
              }`}
      onClick={() => UpdateOrder(setReload, order._id, "accepted")}
    />
    <PiCookingPotLight
            className={`h-[60%] w-1/5 text-xl rounded-xl text-white border-2    bg-gradient-to-tr
                        ${
                          order.status.cooking
                            ? "from-successPrimary to-successSecondary"
                            : "hover:border-sky-500 from-primary to-secondary"
                        }`}
            onClick={() => UpdateOrder(setReload, order._id, "cooking")}
          />

          <LiaShippingFastSolid
           className={`h-[60%] w-1/5 text-xl rounded-xl text-white border-2    bg-gradient-to-tr
                        ${
                          order.status.shipping
                            ? "from-successPrimary to-successSecondary"
                            : "hover:border-sky-500 from-primary to-secondary"
                        }`}
            onClick={() => UpdateOrder(setReload, order._id, "shipping")}
          />

          <RxCross1
            className="bg-gradient-to-tr from-orange-700 to-orange-400 h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-red-400"
            onClick={() => UpdateOrder(setReload, order._id, "canceled")}
          />
      </div>
  )
}

const CustomerOrderPanelButtonSet = ({isCanceled})=>{
    return(
        <div className="w-full h-full flex justify-center items-center gap-2">
                {isCanceled ? (
                  <div>Got Canceled</div>
                ) : (
                  <>
                    <PiHandshakeThin className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 text-xl rounded-xl text-white" />
                    <PiCookingPotLight className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 rounded-xl text-white p-1" />
                    <LiaShippingFastSolid className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 rounded-xl text-white p-1" />
                  </>
                )}
              </div>
    )
}


const ShopPannelButtonSet = ()=>{
    return(
        <div className="w-full h-full flex justify-center items-center gap-2">
                <CiZoomIn className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-sky-500  translate-y-56 group-hover:translate-y-0 delay-0 duration-1000" />

                <CiShoppingCart className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-sky-500  translate-y-56 group-hover:translate-y-0 delay-100 duration-1000" />

                <CiHeart className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 text-xl rounded-xl text-white border-2 hover:border-sky-500  translate-y-56 group-hover:translate-y-0 delay-150 duration-1000" />

                <CiShop className="bg-gradient-to-tr from-primary to-secondary h-[60%] w-1/5 text-sm rounded-xl text-white border-2 hover:border-sky-500  translate-y-56 group-hover:translate-y-0 delay-200 duration-1000" />
              </div>
    )
}




export { BakerOrderPnelButtonSet,CustomerOrderPanelButtonSet,ShopPannelButtonSet,BakerCakeCollectionPannelButtonSet,ViewSingleOrderButtonset };
