import React from 'react'
import { useParams } from 'react-router-dom'

const UpdateACake = () => {
    const {cakeId}=useParams()
    console.log("cakeId",cakeId)
  return (
    <div>
      update a cake
    </div>
  )
}

export default UpdateACake
