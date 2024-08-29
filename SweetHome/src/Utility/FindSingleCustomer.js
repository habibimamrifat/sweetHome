import React from 'react'

const FindSingleCustomer =async (customerId) => {
    // console.log("fromUtility",customerId)
    try{
      const request = await fetch (`http://localhost:5000/findSingleCustomer/${customerId}`)
    if(request.ok)
    {
      const singleCustomer = request.json()
      return(singleCustomer)
    }
    }catch(error)
    {
      return({message:"single cake utility Problem",error})
    }
}

export default FindSingleCustomer
