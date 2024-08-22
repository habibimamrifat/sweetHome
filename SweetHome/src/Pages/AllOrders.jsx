import React, { useEffect, useState,} from 'react'
import { useParams } from 'react-router-dom'
import CakeCard from '../SharedComponents/CakeCard'
import CustomLoader from '../SharedComponents/CustomLoader'

const AllOrders = () => {
    const {shopId}=useParams()
    const [data,setData] = useState(null)
    const [reload,setReload]=useState(true)

    useEffect(()=>{
        const fetchData = async ()=>{
           try
           {
            const request = await fetch(`http://localhost:5000/bakerAllOrderCollection/${shopId}`)

            const responce = await request.json()
           setData(responce)
            
           }
           catch(error)
           {
            console.log("something went wrong in data fetching for all order",error)
           }
        }
       if(reload)
       {
        fetchData()
        setReload(false)
       }
    },[reload])


  return (

    <div className="bg-blue-50 h-full w-full overflow-scroll ">
      {data ? (
        <div className="flex justify-center flex-wrap mx-2 mt-2 gap-y-5 gap-x-5 pb-[200px]">
          {
          data.map((eachOrder,index) => (
            <CakeCard
                Data={eachOrder}
                placement={"bakerOrderPannel"}
                key={index}
                setReload={setReload}/>
          ))}
        </div>
      ) : (
        <CustomLoader />
       
      )}
    </div>
  )
}

export default AllOrders
