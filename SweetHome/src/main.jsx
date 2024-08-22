import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import CustomerSignIn from './Pages/CustomerSignIn.jsx';
import BakerSignIn from './Pages/BakerSignIn.jsx';
import SignUppage from './Pages/SignUppage.jsx';
import Home from './LayOut/Home.jsx';
import Cakes from './Pages/Cakes.jsx';
import Shops from './Pages/Shops.jsx';
import CustomerSignUp from './Pages/CustomerSignUp.jsx';
import BakerSignup from './Pages/BakerSignup.jsx';
import EachShopView from './Pages/EachShopView.jsx';
import LoaderSingleShop from './CustomDataLoader/LoaderSingleShop.js';
import BakerHome from './LayOut/BakerHome.jsx';
import  CustomerHome from "./LayOut/CustomerHome.jsx"
import PrivateRout from './PrivateRoute/PrivateRout.jsx';
import UpdateACake from './Pages/UpdateACake.jsx';
import AllOrders from './Pages/AllOrders.jsx';
import AddCakes from './Pages/AddCakes.jsx';
import SingleOrderView from './Pages/SingleOrderView.jsx';

const router = createBrowserRouter([

  {
    path:"/",
    element:<Home/>,
    children:[
      {
        // Default route that redirects to /allCakes
        index: true,
        element: <Navigate to="/allCakes" />
      },
      {
        path: "/customerSignIn",
        element: <CustomerSignIn/>
      },
      {
        path: "/bakerSignIn",
        element: <BakerSignIn/>
      },
      {
        path: "/signUpPage",
        element: <SignUppage/>,
        children:[
          {
            index:true,
            element:<Navigate to="/signUpPage/customerSignUp" />
          },
          {
            path: "/signUpPage/customerSignUp",
            element: <CustomerSignUp/>
          },
          {
            path: "/signUpPage/bakerSignUp",
            element: <BakerSignup/>
          },
        ]
      },
      {
        path: "/allCakes",
        element: <Cakes/>
      },
      {
        path: "/allShops",
        element: <Shops/>
      },
      {
        path: "/eachShop/:id",
        element: <EachShopView/>,
        loader:LoaderSingleShop
      },
    ]
  },

  {
    path:"/customerhome",
    element:<PrivateRout>
      <CustomerHome/>
      </PrivateRout> 
  },

  {
    path:"/bakerhome",
    element:<PrivateRout >
      <BakerHome/>
      </PrivateRout>,
      children:[
        // all sidebar navition for baker down
        {
          index:true,
          element:<Navigate to="/bakerhome/allCakes/:shopId" />
        },
        {
          path:"/bakerhome/allCakes/:shopId",
          element:<Cakes
          placement={'bakerCakeCollectionPanel'}
          />
        },

        {
          path:"/bakerhome/addCakes/:shopid",
          element:<AddCakes/>
        },
        
        {
          path:"/bakerhome/allOrders/:shopId",
          element:<AllOrders/>
        },

        // all sidebar navition for baker up 

        
        // ......................
        {
          path:"/bakerhome/updateCakeData/:cakeId",
          element:<UpdateACake/>
        },
        {
          path:"/bakerhome/baker/viewSingleOrder/:orderId",
          element:<SingleOrderView/>
        },
      ]
  },
  

 
 

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
