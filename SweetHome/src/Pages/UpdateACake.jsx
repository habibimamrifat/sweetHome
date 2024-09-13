import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import UpdateACakeForm from "../SharedComponents/UpdateACakeForm";
import FindSingleCake from "../Utility/FindSingleCake";

const UpdateACake = () => {
  const { cakeId } = useParams();
  console.log("cakeId", cakeId);
  const targetCake = useRef();
  const [allowForm, setAllowForm] = useState(false);

  useEffect(() => {
    const fetchNecessaryData = async (cakeId) => {
      const cake = await FindSingleCake(cakeId);
      console.log(cake);
      targetCake.current = cake;
      setAllowForm(true);
    };
    fetchNecessaryData(cakeId);
  }, [cakeId]);
  return (
    <div className="w-full h-full overflow-scroll pb-[200px ]">
      {allowForm && <UpdateACakeForm cakeData={targetCake.current} />}
    </div>
  );
};

export default UpdateACake;
