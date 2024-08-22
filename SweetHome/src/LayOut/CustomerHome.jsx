import React, { useContext } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../PrivateRoute/PrivateRout'

const CustomerHome = () => {
    const user = useContext(UserContext)
    console.log("i am ",user)
    return (
    <div>
      i am customer homme 
    </div>
  )
}

export default CustomerHome
