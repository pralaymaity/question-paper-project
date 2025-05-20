
import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashBoardLogo } from "../utils/constant";
import { useAuth } from "./AuthProvider";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation(); // Hook to get the current location

  const showMcqNavLinks = [
    "/dashboard/questionform",
    "/dashboard/question-storage",
    "/dashboard/questionform/questionlist",
    "/dashboard/exam-form",
    "/dashboard/exam-paper/:exam_id",
  ].includes(location.pathname);

  const showCollegeNavLinks = [
    "/dashboard/college-question-form",
    "/dashboard/store-question",
    "/dashboard/college-question-form/questionlist",
    "/dashboard/generate-paper",

  ].includes(location.pathname);

  const navigate = useNavigate();
  const questionList = useSelector((store) => store.questions.list);
  const collegeQuestionList = useSelector((store)=>{
    return store.collegeQuestion.collegeQuestionStorage;
  })
  const { isAuthenticated, signOut } = useAuth(); // Custom hook for authentication

  if (location.pathname === "/") {
    return null; // Do not render the header
  }

  const handleSignout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className=" bg-teal-500 h-20 flex justify-between text-white ">
      <div className="absolute">
        <img className="h-20 w-20" src={DashBoardLogo} alt="logo" />
      </div>

      <div className="relative w-full">

        {/* mcq header */}
        {showMcqNavLinks && (
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
              {location.pathname === "/dashboard/questionform/questionlist" ? (
                <Link
                  to="/dashboard/questionform"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Go Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/questionform/questionlist"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  📃 ({questionList.length})
                </Link>
              )}
            </li>
          </ul>
        )}

        {/* college header */}
        {showCollegeNavLinks && (
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
              {location.pathname === "/dashboard/store-question" ? (
                <Link
                  to="/dashboard/college-question-form"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/store-question"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Store
                </Link>
              )}
            </li>

            <li>
              {location.pathname === "/dashboard/college-question-form/questionlist" ? (
                <Link
                  to="/dashboard/college-question-form"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Go Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/college-question-form/questionlist"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  📃 ({collegeQuestionList.length})
                </Link>
              )}
            </li>

            <li>
              {location.pathname === "/dashboard/generate-paper" ? (
                <Link
                  to="/dashboard/store-question"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/generate-paper"
                  className="text-slate-950 bg-white font-bold text-lg rounded-md p-1 px-3"
                >
                  Show Paper
                </Link>
              )}
            </li>



          </ul>
        )}

        {!showMcqNavLinks && !showCollegeNavLinks && (
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
