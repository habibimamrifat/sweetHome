

const FindSingleCake = async (cakeId) => { 
    // console.log("fromUtility",cakeId)
  try{
    const request = await fetch (`http://localhost:5000/findASingleCake/${cakeId}`)
  if(request.ok)
  {
    const singleCake = request.json()
    return(singleCake)
  }
  }catch(error)
  {
    return({message:"single cake utility Problem",error})
  }
  
}

export default FindSingleCake
