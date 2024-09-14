import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import UpdateACakeForm from "../SharedComponents/UpdateACakeForm";
import FindSingleCake from "../Utility/FindSingleCake";

const UpdateACake = () => {
  const { cakeId } = useParams();
  console.log("cakeId", cakeId);
  const targetCake = useRef();
  const [allowForm, setAllowForm] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNecessaryData = async (cakeId) => {
      const cake = await FindSingleCake(cakeId);
      console.log(cake);
      targetCake.current = cake;
      setAllowForm(true);
    };
    fetchNecessaryData(cakeId);
  }, [cakeId]);

  const handleCakeUpdate = async(updatedCake)=>
  {
    console.log("actual cake",targetCake.current)
    console.log("updated",updatedCake)

    const updateCake = await fetch (`http://localhost:5000/baker/UpdateACake/${cakeId}`,{
      method:"put",
      headers:
      {
        "Content-Type" : "application/json"
      },
      body:JSON.stringify(updatedCake)
    })
    const result = await updateCake.json()
    // console.log("update cake is here",result)
    if(result.acknowledged && result.modifiedCount)
    {
      alert("the cake has been updated")
      navigate(`/bakerhome/allCakes/${targetCake.current.shop_id}`)
    }
    
  }
  return (
    <div className="w-full h-full overflow-scroll pb-[200px ]">
      {allowForm && <UpdateACakeForm cakeData={targetCake.current} fireOnSubmit={handleCakeUpdate}/>}
    </div>
  );
};

export default UpdateACake;
