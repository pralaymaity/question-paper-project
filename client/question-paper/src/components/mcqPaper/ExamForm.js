import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const ExamForm = () => {
  const location = useLocation();
  //console.log(location);

  const [filterquestions, setFilterQuestions] = useState([]);
  console.log(filterquestions);
  const selectedQuestionIds = location.state?.selectedQuestionsIds || []; // Expecting an array of IDs
  //console.log(selectedQuestionIds);

  const [subject, setSubject] = useState("");
  const [ExamDate, setExamDate] = useState("");
  const [academicSession, setAcademicSession] = useState("");
  const [duration, setDuration] = useState("");
  const [fullMarks, setFullMarks] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedQuestionIds.length) {
      fetchQuestions();
    }
  }, []);

  useEffect(() => {
    const totalMarks = filterquestions.reduce((sum, question) => {
      return sum + (question?.questions_details?.marks || 0); 
    }, 0);

    setFullMarks(totalMarks);
  }, [filterquestions]);

  const fetchQuestions = async () => {
    try {
      const ids = selectedQuestionIds.join(",");
      const response = await axios.get(
        `http://localhost:9000/api/add-questions/${ids}`
      );
      setFilterQuestions(response.data);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  const handleDateChange = (e) => {
    const selectedDate = new Date(e.target.value);
    const selectedYear = selectedDate.getFullYear();
    const selectedMonth = selectedDate.getMonth() + 1;
    // Months are zero-indexed in JS (0 = January, 11 = December)

    let sessionStartYear;

    if (selectedMonth >= 3) {
      // If the month is March (3) or later, current year is the start of the session
      sessionStartYear = selectedYear;
    } else {
      // If the month is before March, previous year is the start of the session
      sessionStartYear = selectedYear - 1;
    }

    const sessionEndYear = sessionStartYear + 1;

    const newAcademicSession = `${sessionStartYear}-${sessionEndYear}`;
    setAcademicSession(newAcademicSession);
    setExamDate(e.target.value); // Update date value
  };

  const handleCreateExam = async () => {
    if (!subject || !ExamDate || !duration || !fullMarks) {
      alert("⚠Please fill in all the fields");
      return;
    }

    const examInfo = {
      selectedQuestionIds,
      exam_date: ExamDate, // This should match exactly with the backend
      subject,
      duration,
      academic_session: academicSession,
      fullmarks: fullMarks,
    };

    try {
      const response = await axios.post(
        "http://localhost:9000/api/create-exam",
        examInfo
      );

      const exam_id = response?.data?.exam?.exam_id;

      if (response.status === 200) {
        console.log("Exam Create successfully!");
        alert("Exam Create ✔");

        // Navigate to the ExamPaper component with exam_id
        navigate(`/dashboard/exam-paper/${exam_id}`); // Passing the exam_id in the URL
      } else {
        console.log("Failed to create exam.");
      }
    } catch (error) {
      console.error("Failed to create exam", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 to-purple-100 py-10 px-4">
      <form
        className="bg-white shadow-2xl rounded-2xl max-w-4xl mx-auto p-10"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-center text-4xl font-extrabold text-indigo-800 mb-10">
          Exam Form
        </h1>

        <div className="space-y-6">
          {/* Subject Input */}
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label className="text-2xl font-semibold text-fuchsia-900 w-48">
              Subject Name:
            </label>
            <input
              className="p-3 rounded-md border border-indigo-300 w-full sm:w-2/3 outline-none focus:ring-2 focus:ring-indigo-400"
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          {/* Date and Academic Session */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xl font-medium text-fuchsia-900 mb-1">
                Exam Date:
              </label>
              <input
                className="p-3 rounded-md border border-indigo-300 outline-none focus:ring-2 focus:ring-indigo-400"
                type="date"
                value={ExamDate}
                onChange={handleDateChange}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-medium text-fuchsia-900 mb-1">
                Academic Session:
              </label>
              <input
                className="p-3 rounded-md border border-indigo-300 bg-gray-100 outline-none cursor-not-allowed"
                type="text"
                value={academicSession}
                readOnly
              />
            </div>
          </div>

          {/* Duration and Full Marks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="text-xl font-medium text-fuchsia-900 mb-1">
                Duration (minutes):
              </label>
              <input
                className="p-3 rounded-md border border-indigo-300 outline-none focus:ring-2 focus:ring-indigo-400"
                type="text"
                placeholder="e.g. 90"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-xl font-medium text-fuchsia-900 mb-1">
                Full Marks:
              </label>
              <input
                className="p-3 rounded-md border border-indigo-300 outline-none focus:ring-2 focus:ring-indigo-400"
                type="number"
                placeholder="e.g. 100"
                value={fullMarks}
              />
            </div>
          </div>

          {/* Questions Preview */}
          {filterquestions.length > 0 && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-indigo-800 mb-4">
                Selected Questions:
              </h2>
              <ul className="space-y-3 pl-4 text-lg text-gray-700">
                {filterquestions.map((q, index) => (
                  <li key={q.id} className="ml-1">
                    <span className="font-medium text-blue-900">
                      Q({index + 1}) {q.question}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Create Exam Button */}
          {filterquestions.length > 0 && (
            <div className="text-center mt-8">
              <button
                onClick={handleCreateExam}
                className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white text-lg font-semibold rounded-lg transition-transform transform hover:scale-105 shadow-md"
              >
                Create Exam
              </button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExamForm;
