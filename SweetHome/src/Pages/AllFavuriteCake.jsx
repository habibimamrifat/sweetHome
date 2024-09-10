import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FindFevCakeList from '../Utility/FindFevCakeList'
import FindSingleCake from '../Utility/FindSingleCake'
import CakeCard from '../SharedComponents/CakeCard'

const AllFavuriteCake = () => {
    const {customerId}=useParams()
    const [cakeList,setCakeList]=useState([])
    const [reload,setReload]=useState(false)
    console.log(customerId)

      useEffect(()=>{
        const findDataForAllFevCake = async(customerId) =>
        {
         try{
          const cakeList = await FindFevCakeList(customerId)
          const list = cakeList.fevCakeList
          // console.log("list",list)

          const filterList = list.filter((id) => (id !== null))
          // console.log("filtered",filterList)

          const fevCakeArray = await Promise.all(
            filterList.map((cakeId)=>
            {
              if(cakeId !== null)
              {
                return FindSingleCake(cakeId)
              }
            })
          )
          // console.log("all fev",fevCakeArray)
          setCakeList(fevCakeArray)
          // setReload(false)
          
         }
         catch(error)
         {
          console.log("something went wrong while fetching dat for fev cake",error)
         }
        }

        if (customerId) {
          findDataForAllFevCake(customerId);
        }


      },[customerId,reload])

  return (
    <div className='overflow-scroll h-full w-full'>
      <div className='flex flex-wrap gap-5'>
      {
        cakeList.map((eachCake,index)=>(
         <CakeCard
         Data={eachCake}
         placement={"shopPannel"}
         setReload={setReload}
         />
        ))
      }
      </div>
    </div>
  )
}

export default AllFavuriteCake
