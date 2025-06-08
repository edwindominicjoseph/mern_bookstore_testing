import {createBrowserRouter} from "react-router-dom";
import App from "../App.jsx";
import Home from "../pages/home/home.jsx";
import Register from "../components/Register.jsx";
import Login from "../components/Login.jsx";
import React from 'react';
import Cartpage from "../pages/home/books/Cartpage.jsx";
import Checkoutpage from "../pages/home/books/Checkoutpage.jsx";
import SingleBook from "../pages/home/books/singlebook.jsx";
import Privateroute from "./privateroute.jsx";
const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/cart",
          element: <Cartpage />,
        },
        {
          path: "/about",
          element: <div>About</div>,
        },
        {
          path: "/login",
          element: <Login/>,
        },
       
        {
          path: "/checkout",
          element: <Privateroute><Checkoutpage/></Privateroute>
        },
        
        {
          path: "/books/:id",
          element: <SingleBook />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  export default router;