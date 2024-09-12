import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import CakeCard from '../SharedComponents/CakeCard';
import CustomLoader from '../SharedComponents/CustomLoader';
import { UserContext } from '../PrivateRoute/PrivateRout';
import AllOrderButtons from '../SharedComponents/AllOrderButtons';

const AllOrders = ({ placement }) => {
  const [data, setData] = useState([]); // Initialize with an empty array to avoid undefined issues
  const [isLoading, setIsLoading] = useState(true);
  const { reload, setReload } = useContext(UserContext);
  const httpLink = useRef('');
  const { shopId, customerId } = useParams();
  const cusOrBekerId = useRef('');
  const foundData = useRef([]);
  const [orderList, setOrderList] = useState('allAvailableOrder');

  // Set the API link and identifier based on placement
  useEffect(() => {
    if (placement === 'bakerOrderPannel') {
      cusOrBekerId.current = shopId;
      httpLink.current = 'http://localhost:5000/bakerAllOrderCollection';
    } else if (placement === 'customerOrderPannel') {
      cusOrBekerId.current = customerId;
      httpLink.current = 'http://localhost:5000/customerAllOrderCollection';
    }
  }, [placement, shopId, customerId]);

  // Fetch data based on the placement and reload state
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading state before fetching
      try {
        const request = await fetch(`${httpLink.current}/${cusOrBekerId.current}`);
        if (request.ok) {
          const response = await request.json();
          foundData.current = response;
          setData(response || []);
        } else {
          alert('Something went wrong during fetching data');
        }
      } catch (error) {
        console.log('Something went wrong in data fetching for all orders', error);
      } finally {
        setIsLoading(false);
        setReload(false); // Reset the reload flag after fetching
      }
    };

    // Fetch data only if reload is true or when the component is first loaded
    if (reload || isLoading) {
      fetchData();
    }
  }, [reload, isLoading, setReload]);

  // Handle filtering based on the orderList state and fetched data
  useEffect(() => {
    if (foundData.current && foundData.current.length > 0) {
      let filteredData = [];

      if (placement === 'bakerOrderPannel') {
        switch (orderList) {
          case 'allOrder':
            filteredData = foundData.current;
            break;
          case 'allCanceledOrder':
            filteredData = foundData.current.filter((eachOrder) => eachOrder.status.canceled);
            break;
          case 'allAcceptedOrder':
            filteredData = foundData.current.filter((eachOrder) => eachOrder.status.accepted && !eachOrder.status.cooking);
            break;
          case 'allCookingOrder':
            filteredData = foundData.current.filter((eachOrder) => eachOrder.status.cooking && !eachOrder.status.shipping);
            break;
          case 'allShippingOrder':
            filteredData = foundData.current.filter((eachOrder) => eachOrder.status.shipping && !eachOrder.status.canceled);
            break;
          case 'allAvailableOrder':
            filteredData = foundData.current.filter((eachOrder) => !eachOrder.status.canceled);
            break;
          default:
            filteredData = foundData.current; // Default to all orders
        }
        setData(filteredData);
      } 
      else if (placement === 'customerOrderPannel') {
        filteredData = foundData.current.filter((eachOrder) => !eachOrder.status.canceled);
        setData(filteredData);
      }
    }
  }, [orderList, placement, foundData.current]); // Re-run this effect whenever orderList or placement changes

  return (
    <div className="bg-blue-50 h-full w-full overflow-scroll">
      {placement === 'bakerOrderPannel' && (
        <AllOrderButtons
          orderList={orderList}
          setOrderList={setOrderList}
        />
      )}

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
