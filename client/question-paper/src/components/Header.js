import "../style/header.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashBoardLogo } from "../utils/constant";
import { useAuth } from "./AuthProvider";
import { useSelector } from "react-redux";

const Header = () => {
  const questionList = useSelector((store) => {
    return store.questions.list;
  });

  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current location
  

  const { isAuthenticated, signOut } = useAuth(); // custom hooks

  const handleSignout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="header">
      <div className="header-logo">
        <img src={DashBoardLogo} alt="logo" />
      </div>

      <ul>
        <li>
        {location.pathname === '/questionlist' ? (
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
