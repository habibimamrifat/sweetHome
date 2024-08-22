import { useLoaderData, useParams } from "react-router-dom"

const EachShopView = () => {

  const {id} = useParams()
  console.log(id)

  const found = useLoaderData()
  console.log("i am all data", found)

  return (
    <div>
      ill view each shop
    </div>
  )
}

export default EachShopView
