import React from 'react'
import { useParams } from 'react-router-dom'

const AllFavuriteCake = () => {
    const {cakeId}=useParams()
    console.log(cakeId)
  return (
    <div>
      
    </div>
  )
}

export default AllFavuriteCake
