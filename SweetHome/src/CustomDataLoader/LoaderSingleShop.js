const LoaderSingleShop = () => {
   
 const allDataGather = async () =>{

    const allShopDataUnwraped = await fetch("http://localhost:5000/allShopCollection");
    console.log("from inner1", allShopDataUnwraped)

     const allShopData = await allShopDataUnwraped.json()
     console.log("from inner", allShopData)

     return allShopData
 }
 const found = allDataGather()
 console.log("found",found)

  return found
}

export default LoaderSingleShop
