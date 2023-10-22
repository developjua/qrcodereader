import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Cookies from "js-cookie";

function NavigationBar() {
  const location = useLocation();
  const clickHandler = () => {
    Cookies.remove("jwt_access");
    toast.success("Logout successful");
  };

  const isHomeActive =
    location.pathname === "/home" || location.pathname === "/";
  const isHistoryActive = location.pathname === "/history";

  return (
    <nav className="bg-blue-500 p-4">
      <ul className="flex justify-between space-x-4">
        <div className="flex ml-12">
          {isHomeActive ? (
            <Link
              to="/home"
              className="text-white text-gray-900 font-extrabold border-gray-300 hover:text-yellow-300 justify-self-center font-bold"
            >
              Home
            </Link>
          ) : (
            <Link
              to="/home"
              className="text-white  hover:text-yellow-300 justify-self-center"
            >
              Home
            </Link>
          )}
        </div>

        <div>
          {isHistoryActive ? (
            <Link
              to="/history"
              className="text-white font-extrabold hover:text-yellow-300 font-bold"
            >
              History
            </Link>
          ) : (
            <Link to="/history" className="text-white hover:text-yellow-300">
              History
            </Link>
          )}
        </div>

        <div className="flex justify-end">
          <li>
            <Link
              to="/login"
              onClick={clickHandler}
              className="text-white hover:text-yellow-300"
            >
              Logout
            </Link>
            <ToastContainer />
          </li>
        </div>
      </ul>
    </nav>
  );
}

export default NavigationBar;
