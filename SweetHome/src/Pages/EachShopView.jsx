import { useEffect } from "react"
import { useParams } from "react-router-dom"
import FindSingleShop from "../Utility/FindSingleShop"

const EachShopView = () => {

  const {shopId} = useParams()
  console.log(shopId)

  useEffect(()=>{
    const gatherRequaredData = async(shopId)=>{
      const shopData = await FindSingleShop(shopId)
      console.log(shopData)
    }
    gatherRequaredData(shopId)
  },[shopId])

  return (
    <div>
      ill view each shop
    </div>
  )
}

export default EachShopView
