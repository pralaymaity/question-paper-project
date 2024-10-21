import "../style/header.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashBoardLogo } from "../utils/constant";
import { useAuth } from "./AuthProvider";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation(); // Hook to get the current location
  const navigate = useNavigate();

  const questionList = useSelector((store) => store.questions.list);

  const { isAuthenticated, signOut } = useAuth(); // Custom hook for authentication

  if (location.pathname === "/") {
    return null; // Do not render the header
  }

  const handleSignout = () => {
    signOut(); // Perform sign-out logic
    navigate("/"); // Redirect to home or login page
  };

  return (
    <div className=" bg-gray-800 h-20 flex justify-between text-white ">
      <div className="absolute">
        <img className="h-20 w-20" src={DashBoardLogo} alt="logo" />
      </div>

      <div className="relative w-full">
        <ul className="flex justify-center gap-10 my-6 ">
          <li className="font-bold text-2xl">
            {location.pathname === "/question-storage" ? (
              <button
                onClick={() => navigate("/dashboard")}
                className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
              >
                Home
              </button>
            ) : (
              <Link
                to="/question-storage"
                className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
              >               
                Store
              </Link>
            )}
          </li>

          <li className="font-bold text-2xl">
            {location.pathname === "/questionlist" ? (
              <button
                onClick={() => navigate(-1)}
                className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
              >
                Go Back
              </button>
            ) : (
              <Link
                to="/questionlist"
                className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
              >
                📃 ({questionList.length})
              </Link>
            )}
          </li>
        </ul>
      </div>

      {isAuthenticated && (
        <button className="text-white  font-bold text-lg  p-1 px-3  w-36 rounded-l-lg"
         onClick={handleSignout}>
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
