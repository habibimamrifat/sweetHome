import React, { useContext, useEffect, useState,} from 'react'
import { useParams } from 'react-router-dom'
import CakeCard from '../SharedComponents/CakeCard'
import CustomLoader from '../SharedComponents/CustomLoader'
import { UserContext } from '../PrivateRoute/PrivateRout'

const AllOrders = () => {
    const {shopId}=useParams()
    const [data,setData] = useState(null)
   const [isLoading, setIsLoading]=useState(true)
    const {reload,setReload} = useContext(UserContext)

    useEffect(()=>{
        const fetchData = async ()=>{
           try
           {
            const request = await fetch(`http://localhost:5000/bakerAllOrderCollection/${shopId}`)

           if(request.ok)
           {
            const responce = await request.json()
            setData(responce)
           }
            else{
              alert("something went wrong during Fetchhing Data")
            }
           }
           catch(error)
           {
            console.log("something went wrong in data fetching for all order",error)
           }
           finally
           {
            setIsLoading(false)
           }
        }

      fetchData()
      
       if(reload)
       {
        fetchData()
        setReload(false)
       }
    },[reload])


  return (

    <div className="bg-blue-50 h-full w-full overflow-scroll ">
      {isLoading ?
      <CustomLoader />
      :
      data && data.length >0 ? (
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
        
       <h2>No orders yet</h2>
      )}
    </div>
  )
}

export default AllOrders
