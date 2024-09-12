import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import FindSingleShop from "../Utility/FindSingleShop"
import FindAllShopCakes from "../Utility/FindAllShopCakes"
import { MdAlternateEmail } from "react-icons/md";
import { FaMobileScreen } from "react-icons/fa6";
import CakeCard from "../SharedComponents/CakeCard"

const EachShopView = () => {

  const {shopId} = useParams()
  console.log(shopId)
  const [shop, setShop]= useState()
  const [allCakes, setAllCakes]=useState()

  useEffect(()=>{
    const gatherRequaredData = async (shopId)=>{
      
      const shopData = await FindSingleShop(shopId)
      console.log("shop",shopData)
      setShop(shopData)
      const FetchedallCakes = await FindAllShopCakes(shopId)
      console.log("all cakes",FetchedallCakes)
      setAllCakes(FetchedallCakes)
    }
    gatherRequaredData(shopId)
  },[shopId])

  return (
    <div className="w-full h-full overflow-scroll pb-[200px]">

      <div className=" w- full">

        {
          shop ?
          (<div className="w-full relative h-[50vh]">
            <img src={shop?.bannerimg} alt="" 
            className="w-full h-full object-fill"/>
  
            <div className="absolute inset-0">
               <div className="mx-[2%] mt-[2%] ">
  
               <div className=" h-20 w-20 bg-black/20 flex items-center gap-5">
               <img src={shop?.logoimg} alt="" 
               className="w-full h-full object-cover"/>
  
               <p className="text-white text-xl font-bold">{shop?.name.toUpperCase()}</p>
               </div>
  
               <div className="absolute bottom-0 w-full h-20 bg-black/20 text-white">
  
                <div className="flex gap-2 ms-2 items-center">
                <MdAlternateEmail />
                <p>{shop?.email}</p>
                </div>
  
                <div className="flex gap-2 ms-2 items-center">
                <FaMobileScreen />
                <p>{shop?.mob}</p>
                </div>
  
                <div className="flex gap-2 ms-2 items-center">
                <FaMobileScreen />
                <p>{shop?.mobAlt}</p>
                </div>
                
               </div>
  
               </div>
            </div>
          </div>)
          :
          (
            <h2>
              Something went wrong
            </h2>
          )
        }

        <div className=" flex gap-5 flex-wrap justify-center mt-5">
        {
          allCakes ? (
            allCakes.map((eachCake) => (
              <CakeCard key={eachCake._id} 
              placement={"singleShopCakePannel"}
              Data={eachCake}
              />
            ))
          ) : (
            <h2>Something went wrong</h2>
          )
        }
        </div>

      </div>
     
    </div>
  )
}

export default EachShopView
