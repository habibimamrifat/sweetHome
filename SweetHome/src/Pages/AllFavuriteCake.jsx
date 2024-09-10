import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FindFevCakeList from '../Utility/FindFevCakeList'
import FindSingleCake from '../Utility/FindSingleCake'
import CakeCard from '../SharedComponents/CakeCard'
import CustomLoader from "../SharedComponents/CustomLoader"

const AllFavuriteCake = () => {
  const { customerId } = useParams();
  const [cakeList, setCakeList] = useState([]);
  const [reloadFev, setReloadFev] = useState(true);
  const [isLoading,setIsLoading]=useState(true)

  useEffect(() => {
    const findDataForAllFevCake = async () => {
      try {
        const cakeList = await FindFevCakeList(customerId);
        const list = cakeList.fevCakeList;

        const filterList = list.filter((id) => id !== null);

        const fevCakeArray = await Promise.all(
          filterList.map((cakeId) => {
            return FindSingleCake(cakeId); // Always return the promise
          })
        );

        setCakeList(fevCakeArray);
        setReloadFev(!reloadFev); // Reset reload state after fetching
      } catch (error) {
        console.log('Something went wrong while fetching data for favorite cakes', error);
      }
      finally
      {
        setIsLoading(false)
      }
    };

    if (customerId ) {
      findDataForAllFevCake();
    }
  }, [customerId, reloadFev]);

  return (
    <div className='overflow-scroll h-full w-full '>
      <div className='flex flex-wrap gap-5 w-full justify-center'>
      {
        isLoading ? <CustomLoader/> :
        (
          cakeList.length>0 ? 
          (cakeList.map((eachCake,index)=>(
            <CakeCard
            key={index}
            Data={eachCake}
            placement={"shopPannel"}
            />
           )))
           :
           (
            <h2>no fev cake</h2>
           )
        )
      }
      </div>
    </div>
  )
}

export default AllFavuriteCake
