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
import BakerHome from './LayOut/BakerHome.jsx';
import  CustomerHome from "./LayOut/CustomerHome.jsx"
import PrivateRout from './PrivateRoute/PrivateRout.jsx';
import UpdateACake from './Pages/UpdateACake.jsx';
import AllOrders from './Pages/AllOrders.jsx';
import AddCakes from './Pages/AddCakes.jsx';
import SingleOrderView from './Pages/SingleOrderView.jsx';
import PlaceAnOrder from './Pages/PlaceAnOrder.jsx';
import SingleCakeView from './Pages/SingleCakeView.jsx';
import AllFavuriteCake from './Pages/AllFavuriteCake.jsx';

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
        path: "/allCakes/placeAnOrder/:cakeId",
        element: <PlaceAnOrder/>
      },
      {
        path: "/allShops/eachShop/:shopId/placeAnOrder/:cakeId",
        element: <PlaceAnOrder/>
      },
      {
        path: "/allCakes/eachShop/:shopId/placeAnOrder/:cakeId",
        element: <PlaceAnOrder/>
      },
      {
        path: "/allCakes/viewSingleCake/:cakeId",
        element: <SingleCakeView/>
      },
      {
        path: "/:base/eachShop/:shopId/viewSingleCake/:cakeId",
        element: <SingleCakeView/>
      },
      {
        path: "/:base/eachShop/:shopId",
        element: <EachShopView/>
      },
      
     
    ]
  },
  

  {
    path:"/customerhome",
    element:<PrivateRout>
      <CustomerHome/>
      </PrivateRout>,
      children:[
        {
          index:true,
          element:<Navigate to={"/customerhome/allCakes"}/>
        },
        {
          path:"allCakes",
          element:<Cakes/>
        },
        {
          path:"allShops",
          element:<Shops/>
        },
        {
          path:"allOrders/:customerId",
          element:<AllOrders
          placement={"customerOrderPannel"}
          />
        },
        {
          path: "/customerhome/allCakes/placeAnOrder/:cakeId",
          element: <PlaceAnOrder/>
        },
        {
          path: "/customerhome/fevList/:customerId/placeAnOrder/:cakeId",
          element: <PlaceAnOrder/>
        },
        {
          path: "/customerhome/allCakes/eachShop/:shopId/placeAnOrder/:cakeId",
          element: <PlaceAnOrder/>
        },

        {
          path: "/customerhome/allCakes/viewSingleCake/:cakeId",
          element: <SingleCakeView/>
        },
        {
          path: "/customerhome/allCakes/eachShop/:shopId/viewSingleCake/:cakeId",
          element: <SingleCakeView/>
        },
        {
          path: "/customerhome/fevList/:customerId/viewSingleCake/:cakeId",
          element: <SingleCakeView/>
        },
        {
          path: "/customerhome/allShops/eachShop/:shopId/viewSingleCake/:cakeId",
          element: <SingleCakeView/>
        },

        {
          path: "/customerhome/:base/eachShop/:shopId",
          element: <EachShopView/>
        },
        {
          path: "/customerhome/fevList/:customerId/eachShop/:shopId",
          element: <EachShopView/>
        },
        {
          path: "/customerhome/fevList/:customerId",
          element: <AllFavuriteCake/>
        }
      ]
  },

  {
    path:"/bakerhome",
    element:<PrivateRout >
      <BakerHome/>
      </PrivateRout>,
      children:[
        // all sidebar navition for baker down
        {
          path:"allCakes/:shopId",
          element:<Cakes
          placement={'bakerCakeCollectionPanel'}
          />
        },

        {
          path:"addCakes/:shopid",
          element:<AddCakes/>
        },
        
        {
          path:"allOrders/:shopId",
          element:<AllOrders
          placement={"bakerOrderPannel"}
          />
        },

        // all sidebar navition for baker up 

        
        // ......................
        {
          path:"updateCakeData/:cakeId",
          element:<UpdateACake/>
        },
        {
          path:"baker/viewSingleOrder/:orderId",
          element:<SingleOrderView/>
        },

        {
          path:"/bakerhome/allCakes/viewSingleCake/:cakeId",
          element:<SingleCakeView
          placement={'bakerHome'}
          />
        }
      ]
  }, 

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <RouterProvider router={router} />
  </React.StrictMode>,
)
