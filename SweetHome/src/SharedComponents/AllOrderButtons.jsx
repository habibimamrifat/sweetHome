import React from 'react';

const AllOrderButtons = ({ orderList, setOrderList }) => {
  return (
    <div className='flex gap-2 flex-wrap justify-center sticky top-1 z-20 bg-primary/20 p-2 overflow-hidden'>
      <button
        className='p-1 bg-primary rounded-md text-white shadow-lg hover:shadow-xl hover:shadow-gray-600/50 transition-shadow'
        onClick={() => setOrderList("allOrder")}
      >
        All Orders
      </button>

      <button
        className='p-1 bg-primary rounded-md text-white shadow-lg hover:shadow-xl hover:shadow-gray-600/50 transition-shadow'
        onClick={() => setOrderList('allAvailableOrder')}
      >
        Available Orders
      </button>

      <button
        className='p-1 bg-primary rounded-md text-white shadow-lg hover:shadow-xl hover:shadow-gray-600/50 transition-shadow'
        onClick={() => setOrderList("allAcceptedOrder")}
      >
        Accepted Orders
      </button>

      <button
        className='p-1 bg-primary rounded-md text-white shadow-lg hover:shadow-xl hover:shadow-gray-600/50 transition-shadow'
        onClick={() => setOrderList("allCookingOrder")}
      >
        Cooking Orders
      </button>

      <button
        className='p-1 bg-primary rounded-md text-white shadow-lg hover:shadow-xl hover:shadow-gray-600/50 transition-shadow'
        onClick={() => setOrderList("allShippingOrder")}
      >
        Shipping Orders
      </button>

      <button
        className='p-1 bg-primary rounded-md text-white shadow-lg hover:shadow-xl hover:shadow-gray-600/50 transition-shadow'
        onClick={() => setOrderList("allCanceledOrder")}
      >
        Canceled Orders
      </button>
    </div>
  );
};

export default AllOrderButtons;
