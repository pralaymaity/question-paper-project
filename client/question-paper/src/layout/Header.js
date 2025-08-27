import { Link, useLocation, useNavigate } from "react-router-dom";
import { DashBoardLogo } from "../utils/constant";
import { useAuth } from "../features/auth/AuthProvider";
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
  const collegeQuestionList = useSelector((store) => {
    return store.collegeQuestion.collegeQuestionStorage;
  });
  const { isAuthenticated, signOut } = useAuth(); // Custom hook for authentication

  if (location.pathname === "/") {
    return null; // Do not render the header
  }

  const handleSignout = () => {
    signOut();
    navigate("/");
  };

  return (
    <div className="bg-teal-500 h-20 flex items-center justify-between text-white px-4">
      {/* Logo */}
      <div className="flex-shrink-0">
        <img
          className="h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20"
          src={DashBoardLogo}
          alt="logo"
        />
      </div>

      {/* Nav Links */}
      <div className="flex-1">
        {/* MCQ Header */}
        {showMcqNavLinks && (
          <ul className="flex flex-wrap justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 my-2 sm:my-4 text-xs sm:text-sm md:text-base">
            <li>
              <Link
                to="/dashboard"
                className={`text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 ${
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
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1"
                >
                  Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/question-storage"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1"
                >
                  Store
                </Link>
              )}
            </li>

            <li>
              {location.pathname === "/dashboard/questionform/questionlist" ? (
                <Link
                  to="/dashboard/questionform"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1"
                >
                  Go Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/questionform/questionlist"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1"
                >
                  📃 ({questionList.length})
                </Link>
              )}
            </li>
          </ul>
        )}

        {/* College Header */}
        {showCollegeNavLinks && (
          <ul className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 md:gap-6 lg:gap-10 my-2 sm:my-4 text-xs sm:text-sm md:text-base">
            <li className="flex">
              <Link
                to="/dashboard"
                className={`text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 flex items-center ${
                  location.pathname === "/dashboard" ? "bg-blue-100" : ""
                }`}
              >
                Home
              </Link>
            </li>

            <li className="flex">
              {location.pathname === "/dashboard/store-question" ? (
                <Link
                  to="/dashboard/college-question-form"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 flex items-center"
                >
                  Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/store-question"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 flex items-center"
                >
                  Store
                </Link>
              )}
            </li>

            <li className="flex">
              {location.pathname ===
              "/dashboard/college-question-form/questionlist" ? (
                <Link
                  to="/dashboard/college-question-form"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 flex items-center"
                >
                  Go Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/college-question-form/questionlist"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 flex items-center"
                >
                  📃 ({collegeQuestionList.length})
                </Link>
              )}
            </li>

            <li className="flex">
              {location.pathname === "/dashboard/generate-paper" ? (
                <Link
                  to="/dashboard/store-question"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 flex items-center"
                >
                  Back
                </Link>
              ) : (
                <Link
                  to="/dashboard/generate-paper"
                  className="text-slate-950 bg-white font-bold rounded-md px-2 sm:px-3 py-1 flex items-center"
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

      {/* Sign Out */}
      {isAuthenticated && (
        <button
          className="text-teal-500 border-2 border-teal-500 bg-white font-bold text-xs sm:text-sm md:text-lg px-2 sm:px-3 py-1 rounded-md ml-2 w-auto sm:w-28 md:w-36"
          onClick={handleSignout}
        >
          Sign Out
        </button>
      )}
    </div>
  );
};

export default Header;
