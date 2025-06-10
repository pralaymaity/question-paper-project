import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ExamDetailsPopup from "./ExamDetailsPopup";

const SideBar = () => {
  const [showSubjects, setShowSubjects] = useState(false);
  const [subjectList, setSubjectList] = useState([]);
  //console.log(subjectList);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // State for popup management
  const [showPopup, setShowPopup] = useState(false);
  const [selectedExamDetails, setSelectedExamDetails] = useState(null); // Stores { exam_id, fullmarks, duration }

  const navigate = useNavigate();

  useEffect(() => {
    handleSubjects();
  }, []);

  const handleSubjects = async () => {
    try {
      const response = await axios.get(
        "http://localhost:9000/api/get-subjects"
      );

      const subjectNames = response?.data;
      setSubjectList(subjectNames);
    } catch (err) {
      console.log("failed to add subjects");
    }
  };

  const handleSubjectClick = async (subject) => {
    try {
      const response = await axios.get(
        `http://localhost:9000/api/demoExam/${subject}`
      );

      const { exam_id, fullmarks, duration } = response?.data;

      if (exam_id && fullmarks !== undefined && duration !== undefined) {
        
        setSelectedExamDetails({ exam_id, fullmarks, duration });
        setShowPopup(true);

      } else {
        alert(
          `something wrong in response data`
        );
      }

      // Close the subject list and sidebar after selection
      setShowSubjects(false);
      // setIsSidebarOpen(false); // You might want to keep sidebar open if popup is overlay

      //const exam_id = response?.data?.exam_id;

      //console.log(response);

      //navigate(`/dashboard/exam-paper/${exam_id}`);
    } catch (error) {
      alert("No demo exam available for " + subject);
    }
  };

  const handleStartExam = (examId) => {
    navigate(`/dashboard/exam-paper/${examId}`); // Navigate to the exam paper
    setShowPopup(false); // Close the popup
  };

  // --- Function to handle closing the popup (e.g., "Cancel" button or backdrop click) ---
  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedExamDetails(null); // Clear details
    
  };

  return (
    <div>
      <div
        className={`absolute top-0 left-0 h-full bg-slate-300 shadow-xl transition-transform duration-300 z-40
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} w-64`}
      >
        <div className="flex justify-between items-center p-4 border-b-2 border-black">
          <h2 className="text-xl font-semibold">Menu</h2>
          <button
            className="text-xl"
            onClick={() => {
              setIsSidebarOpen(false);
              setShowSubjects(false);
            }}
          >
            ✕
          </button>
        </div>
        <div className="p-3">
          <div className="">
            <button
              onClick={() => {
                setShowSubjects(true);
                handleSubjects();
              }}
              className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition"
            >
              Demo Exam
            </button>
          </div>
          <div className="mt-8">
            {showSubjects && (
              <ul className="space-y-2">
                {subjectList.map((subj) => (
                  <li key={subj.id}>
                    <button
                      className="w-full font-semibold text-left bg-purple-100 hover:bg-purple-200 text-purple-800 py-2 px-4 rounded"
                      onClick={() => {
                        handleSubjectClick(subj.subject_name);

                        setShowSubjects(false);
                        setIsSidebarOpen(false);
                      }}
                    >
                      {subj.subject_name}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Hamburger Button */}
      {!isSidebarOpen && (
        <button
          className="absolute top-26 left-4 z-50 bg-teal-500 text-white px-3 py-2 rounded-md shadow-lg text-xl"
          onClick={() => setIsSidebarOpen(true)}
        >
          ☰
        </button>
      )}


      {/* NEW: Exam Details Popup (rendered outside the sidebar to ensure it's on top) */}
      {showPopup && selectedExamDetails && (
        <ExamDetailsPopup
          fullmarks={selectedExamDetails.fullmarks}
          duration={selectedExamDetails.duration}
          examId={selectedExamDetails.exam_id}
          onStartExam={handleStartExam} // Passed down to popup
          onClose={handleClosePopup}   // Passed down to popup
        />
      )}
    </div>
  );
};

export default SideBar;
