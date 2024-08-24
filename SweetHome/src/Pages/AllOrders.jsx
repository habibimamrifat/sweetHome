import React, { useContext, useEffect, useRef, useState,} from 'react'
import { useParams } from 'react-router-dom'
import CakeCard from '../SharedComponents/CakeCard'
import CustomLoader from '../SharedComponents/CustomLoader'
import { UserContext } from '../PrivateRoute/PrivateRout'

const AllOrders = ({placement}) => {
    console.log("all orders",placement)
    const [data,setData] = useState(null)
   const [isLoading, setIsLoading]=useState(true)
    const {reload,setReload} = useContext(UserContext)
    const httpLink = useRef()

    const cusOrBekerId= useRef()

    if(placement === "bakerOrderPannel")
    {
      const {shopId}=useParams()
      cusOrBekerId.current=shopId
        httpLink.current = "http://localhost:5000/bakerAllOrderCollection"
    }
    else if (placement === "customerOrderPannel")
    {
      const {customerId}=useParams()
      cusOrBekerId.current=customerId
      httpLink.current = "http://localhost:5000/customerAllOrderCollection"
    }

    useEffect(()=>{
        const fetchData = async ()=>{
           try
           {
            const request = await fetch(`${httpLink.current}/${cusOrBekerId.current}`)

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
                placement={placement}
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
