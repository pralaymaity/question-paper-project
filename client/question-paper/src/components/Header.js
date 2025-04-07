import "../style/header.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashBoardLogo } from "../utils/constant";
import { useAuth } from "./AuthProvider";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation(); // Hook to get the current location

  const showMcqNavLinks = [
    "/dashboard/questionform",
    "/dashboard/question-storage",
    "/dashboard/questionlist",
    "/dashboard/exam-form",
    "/dashboard/exam-paper/:exam_id",
  ].includes(location.pathname);

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
    <div className=" bg-teal-500 h-20 flex justify-between text-white ">
      <div className="absolute">
        <img className="h-20 w-20" src={DashBoardLogo} alt="logo" />
      </div>

      <div className="relative w-full">
        {showMcqNavLinks ? (
          <ul className="flex justify-center gap-10 my-6 ">
            <li>
              <Link
                to="/dashboard"
                className={`text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3 ${
                  location.pathname === "/dashboard" ? "bg-blue-100" : ""
                }`}
              >
                Home
              </Link>
            </li>

            <li>
              {location.pathname === "/dashboard/question-storage" ? (
                <Link
                  to="/dashboard/questionform"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/question-storage"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Store
                </Link>
              )}
            </li>

            <li>
              {location.pathname === "/dashboard/questionlist" ? (
                <Link
                  to="/dashboard/questionform"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Go Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/questionlist"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  📃 ({questionList.length})
                </Link>
              )}
            </li>
          </ul>
        ) : (
          <div className="h-10"></div>
        )}
      </div>

      {isAuthenticated && (
        <button
          className="text-teal-500 border-2 border-teal-500 bg-white  font-bold text-lg  p-1 px-3  w-36 "
          onClick={handleSignout}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
