import { useLocation, useNavigate } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const ExamForm = () => {
  const location = useLocation();
  const [filterquestions, setFilterQuestions] = useState([]);
  //console.log(filterquestions);
  const selectedQuestionIds = location.state?.selectedQuestions || []; // Expecting an array of IDs

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

  const fetchQuestions = async () => {
    try {
      const ids = selectedQuestionIds.join(",");
      const response = await axios.get(
        `http://localhost:3000/api/add-questions/${ids}`
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
    const examInfo = {
      selectedQuestionIds,
      exam_date: ExamDate, // This should match exactly with the backend
      subject,
      duration,
      academic_session: academicSession,
      fullmarks: fullMarks,
    };

    try {
      const response = await axios.post("/api/create-exam", examInfo);

      const exam_id = response?.data?.exam?.exam_id;

      if (response.status === 200) {
        console.log("Exam Create successfully!");
        alert("Exam Create ✔");

        // Navigate to the ExamPaper component with exam_id
        navigate(`/exam-paper/${exam_id}`); // Passing the exam_id in the URL
      } else {
        console.log("Failed to create exam.");
      }
    } catch (error) {
      console.error("Failed to create exam", error);
    }
  };

  return (
    <div className="h-auto ">
      <form
        className="absolute bg-slate-50 h-auto  my-10 w-8/12 right-0 left-0 mx-auto rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-center text-green-800 font-bold py-8 text-4xl">
          Exam Form
        </h1>

        <div className="mx-6 my-4">
          <div className="flex ">
            <p className="text-3xl text-fuchsia-900 font-semibold">
              Subject Name :{" "}
            </p>
            <input
              className="p-2 mx-2 rounded-md border border-cyan-950 w-4/12 outline-none"
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => {
                setSubject(e.target.value);
              }}
            />
          </div>

          <div className="flex justify-start space-x-8 my-4">
            <span className="flex justify-start">
              <p className="text-xl text-fuchsia-900 font-semibold my-1">
                Date :{" "}
              </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="date"
                value={ExamDate}
                onChange={handleDateChange}
              />
            </span>

            <span className="flex justify-start">
              <p className="text-xl text-fuchsia-900 font-semibold my-1">
                Academic Session :{" "}
              </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="text"
                placeholder="year"
                value={academicSession}
                readOnly
              />
            </span>
          </div>

          <div className="flex justify-normal">
            <div className="flex">
              <p className="text-xl text-fuchsia-900 font-semibold my-1">
                Duration :{" "}
              </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="text"
                placeholder="Minutes"
                value={duration}
                onChange={(e) => {
                  setDuration(e.target.value);
                }}
              />
            </div>

            <div className="flex mx-5">
              <p className="text-xl text-fuchsia-900 font-semibold my-1">
                Full Marks :{" "}
              </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="number"
                placeholder="Marks"
                value={fullMarks}
                onChange={(e) => {
                  setFullMarks(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="my-6">
            {filterquestions.map((q, index) => {
              return (
                <ul className="font-semibold text-lg " key={q.id}>
                  <li className="font-bold text-xl text-blue-800 my-3">
                    Q({index + 1}) {q.question}
                  </li>
                </ul>
              );
            })}
          </div>
          {filterquestions.length > 0 && (
            <div className="my-6">
              <button
                onClick={handleCreateExam}
                className="p-3 rounded-md font-semibold bg-blue-950 border text-white"
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
