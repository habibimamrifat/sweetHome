import React, { useEffect, useState } from 'react'
import ShopCard from '../SharedComponents/ShopCard'
import CustomLoader from '../SharedComponents/CustomLoader'

const Shops = () => {
  // const Data = {
  //   "shop_id": "shop123",
  //   "shop_owner_id": "owner456",
  //   "shop_name": "Sweet Delights Bakery",
  //   "shop_address": "123 Cake Street, Bakersville, CA 94016",
  //   "shop_contact": "+1-234-567-8901",
  //   "shop_email": "contact@sweetdelights.com",
  //   "shop_description": "A family-owned bakery offering a wide variety of delicious cakes and pastries made from the finest ingredients.",
  //   "shop_rating": 4.8,
  //   "shop_banner": "https://picsum.photos/id/1011/800/300",
  //   "shop_logo": "https://picsum.photos/id/1011/200/200"
  // }

  const [allShops, setAllShops]=useState([])

  useEffect(()=>{
    const fetchAllShops = async () => {
      try {
        const shops = await fetch("/Data/ShopData.json");
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
          <ShopCard key={shop.shop_id} Data={shop} />
        ))}
      
      </div>) : (
        <CustomLoader />
      )}
    </div>
  )
}

export default Shops
