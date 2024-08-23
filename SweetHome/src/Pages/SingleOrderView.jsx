import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { TextDarkest } from '../SharedComponents/ButtonAndText'
import { ViewSingleOrderButtonset } from '../SharedComponents/CardButtonSet'
import { UserContext } from '../PrivateRoute/PrivateRout'

const SingleOrderView = () => {
  const {orderId}=useParams()
  const [order,setOrder]= useState(null)

  const {reload, setReload}= useContext(UserContext)
  
  // console.log(orderId)
  
  useEffect(()=>{

    const findSingleOrder = async () =>{
      try {
        const findOrder = await fetch(
          `http://localhost:5000/bakerFindSingleOrder/${orderId}`
        );
        const order = await findOrder.json();
        setOrder(order)
        console.log("Targeted order", order);
    
      } catch (error) {
        alert("Something went wrong while finding the single order.");
      }
    }

    findSingleOrder()
    
    if(reload)
    {
      findSingleOrder()
      setReload(false)
    }

  },[reload])

  return (
    <div className='w-full h-full overflow-scroll pb-20'>

      <div className='w-full h-52 px-5'>
        <img src={order?.cake_pic} alt="" 
        className='w-full h-full object-fit'/>
      </div>

      <div className='px-5 mt-6 flex justify-between'>
        <div className='text-2xl font-bold'>
        <TextDarkest
        text={order?.cake_Name}/>
        </div>

        <div className='text-2xl font-bold'>
        <TextDarkest
        text={`${order?.price} TK`}/>
        </div>
      </div>

      <div className='w-full  mt-10 px-5'>
        <div className='border-[1px] border-primary'>
          <p>Order Date: {order?.order_date}</p>
          <p>Delivery Date: {order?.order_date}</p>

          <p className='mt-5'>Special Requement: {order?.Special_Requarment}</p>
        </div>
      </div>
     
     {
      order && 
      <ViewSingleOrderButtonset
      order={order}
      setReload={setReload}
      />
     }
    </div>
  )
}

export default SingleOrderView
