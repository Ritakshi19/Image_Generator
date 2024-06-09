import React from "react";
import { useState } from "react";
import ReactDOM from "react-dom/client";
import HomePage from "./src/pages/HomePage/homePage.js";
import History from "./src/pages/History/history.js";
import Login from "./src/pages/login/login.js";
import Signup from "./src/pages/signup/signup.js";
import "./globalStyles.css";
import PointsContext from "./src/context/pointsContext.js";

import {
  createBrowserRouter,
  Navigate,
  redirect,
  RouterProvider,
} from "react-router-dom";
import ImageGntr from "./src/pages/ImageGenerator/ImageGntr.js";

const parent = document.getElementById("root"); //real DOM
const root = ReactDOM.createRoot(parent);

const App = () => {
  const [userPoints, setUserPoints] = useState(20);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem("token")) {
      return true;
    } else return false;
  });
  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
  };

  const router = createBrowserRouter([
    { path: "/home", element: <HomePage /> },
    { path: "/", element: <HomePage /> },
    {
      path: "/imagegenerator",
      element: isLoggedIn ? <ImageGntr /> : <Navigate to="/login" />,
    },
    { path: "/history", element: <History /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },

  ]);
  return (
    <PointsContext.Provider
      value={{
        userPoints: userPoints,
        setUserPoints: setUserPoints,
        isLoggedIn: isLoggedIn,
        login,
        logout,
      }}
    >
      <RouterProvider router={router} />
    </PointsContext.Provider>
  );
};
root.render(<App />);
