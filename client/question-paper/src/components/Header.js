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
    <div className="header">
      <div className="header-logo">
        <img src={DashBoardLogo} alt="logo" />
      </div>

      <ul className="header-ul">

        <li className="storage">
          <Link to="/question-storage" className="header-link">Storage</Link> 
        </li>

        <li>
          {location.pathname === "/questionlist" ? (
            <button onClick={() => navigate(-1)} className="header-go-back">
              Go Back
            </button>
          ) : (
            <Link to="/questionlist" className="header-link">
              📃 ({questionList.length})
            </Link>
          )}
        </li>

      </ul>

      {isAuthenticated && (
        <button className="handleSignout" onClick={handleSignout}>
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
