import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CakeCard from '../SharedComponents/CakeCard';
import CustomLoader from '../SharedComponents/CustomLoader';
import { UserContext } from '../PrivateRoute/PrivateRout';

const AllOrders = ({ placement }) => {
  const [data, setData] = useState([]); // Initialize with an empty array to avoid undefined issues
  const [isLoading, setIsLoading] = useState(true);
  const { reload, setReload } = useContext(UserContext);
  const httpLink = useRef('');
  const { shopId, customerId } = useParams();
  const cusOrBekerId = useRef('');
  const foundData = useRef([]);
  const [orderList, setOrderList] = useState('allAvailableOrder');

  if (placement === 'bakerOrderPannel') {
    cusOrBekerId.current = shopId;
    httpLink.current = 'http://localhost:5000/bakerAllOrderCollection';
  } else if (placement === 'customerOrderPannel') {
    cusOrBekerId.current = customerId;
    httpLink.current = 'http://localhost:5000/customerAllOrderCollection';
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(`${httpLink.current}/${cusOrBekerId.current}`);

        if (request.ok) {
          const response = await request.json();
          foundData.current = response;
          setData(response || []); // Initialize with an empty array if response is undefined
        } else {
          alert('Something went wrong during fetching data');
        }
      } catch (error) {
        console.log('Something went wrong in data fetching for all orders', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (reload || isLoading) {
      fetchData();
      setReload(false); // Reset the reload flag after fetching
    }
  }, [reload, isLoading, setReload]);

  // Add a useEffect to handle filtering based on the orderList state change
  useEffect(() => {
    if (foundData.current && foundData.current.length > 0) {
      let filteredData = [];

      switch (orderList) {
        case 'allCanceledOrder':
          filteredData = foundData.current.filter((eachOrder) => eachOrder.status.canceled);
          break;
        case 'allAcceptedOrder':
          filteredData = foundData.current.filter((eachOrder) => eachOrder.status.accepted);
          break;
        case 'allCookingOrder':
          filteredData = foundData.current.filter((eachOrder) => eachOrder.status.cooking);
          break;
        case 'allShippingOrder':
          filteredData = foundData.current.filter((eachOrder) => eachOrder.status.shipping);
          break;
        case 'allAvailableOrder':
          filteredData = foundData.current.filter((eachOrder) => !eachOrder.status.canceled);
          break;
        default:
          filteredData = foundData.current; // Default to all orders
      }

      setData(filteredData);
    }
  }, [orderList]); // Re-run this effect whenever orderList changes

  return (
    <div className="bg-blue-50 h-full w-full overflow-scroll">
      <div className='flex gap-5'>
        <button onClick={() => setOrderList("allAvailableOrder")}>
          Available Orders
        </button>
        <button onClick={() => setOrderList("allAcceptedOrder")}>
          Accepted Orders
        </button>
        <button onClick={() => setOrderList("allCookingOrder")}>
          Cooking Orders
        </button>
        <button onClick={() => setOrderList("allShippingOrder")}>
          Shipping Orders
        </button>
        <button onClick={() => setOrderList("allCanceledOrder")}>
          Canceled Orders
        </button>
      </div>
      {isLoading ? (
        <CustomLoader />
      ) : data && data.length > 0 ? ( // Now data will always be an array, so no undefined error
        <div className="flex justify-center flex-wrap mx-2 mt-2 gap-y-5 gap-x-5 pb-[200px]">
          {data.map((eachOrder, index) => (
            <CakeCard
              Data={eachOrder}
              placement={placement}
              key={index}
              setReload={setReload}
            />
          ))}
        </div>
      ) : (
        <h2>No orders yet</h2>
      )}
    </div>
  );
};

export default AllOrders;
