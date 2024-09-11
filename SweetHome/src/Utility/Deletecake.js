import React from 'react'
import UserAvalable from './UserAvalable'

const Deletecake =async (cakeId) => {
//  console.log(cakeId)
//  setReload(true)

 const loggeduser = UserAvalable()
 console.log(loggeduser)

 try{
    const request = await fetch(`http://localhost:5000/baker/deleteCake/${loggeduser.loggedUser.shopId}/${cakeId}`,
        {
            method:"PUT",
            headers:
            {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                deleted:true
            })
        }
    )
    const result =await request.json()
    return result
 }
 catch(error)
 {
    console.log({message:"someting went wrong on the clint side",error})
 }
}

export default Deletecake
