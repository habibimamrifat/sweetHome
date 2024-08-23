import React, { useEffect, useState } from 'react'
import ShopCard from '../SharedComponents/ShopCard'
import CustomLoader from '../SharedComponents/CustomLoader'

const Shops = () => {

  const [allShops, setAllShops]=useState([])

  useEffect(()=>{
    const fetchAllShops = async () => {
      try {
        const shops = await fetch("http://localhost:5000/allShopCollection");
        if (!shops.ok) {
          throw new Error("Network response was not ok");
        }
        const shopArray = await shops.json();
        setAllShops(shopArray);
      } catch (error) {
        setError(error);
      }
    };

    fetchAllShops();
  },[])


  return (
    <div className="bg-blue-50 h-full w-full overflow-scroll pb-[200px] ">
      {allShops && allShops.length > 0 ? (<div className="flex justify-center flex-wrap mx-2 mt-2 gap-y-5 gap-x-5 pb-[200px]">
        
       { allShops.map((shop, index) => (
          <ShopCard key={shop._id} Data={shop} />
        ))}
      
      </div>) : (
        <CustomLoader />
      )}
    </div>
  )
}

export default Shops
