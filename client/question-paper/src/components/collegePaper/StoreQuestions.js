import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestion, removeQuestion } from "../../utils/selectQuestionSlice";
import { useNavigate } from "react-router-dom";

const StoreQuestions = () => {
  const [subjects, setSubjects] = useState([]);
  //console.log(subjects);
  const [questions, setQuestions] = useState([]);
  //console.log(questions);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);

  const highlights = useSelector((state) => {
    return state.selectedQuestions.highlights;
  });

  const groupCounts = useSelector((state) => {
    return state.selectedQuestions.groupCounts;
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/take-question",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Bearer format
          },
        }
      );

      let jsonData = response.data;
      setQuestions(jsonData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchSubject();
  }, []);

  const fetchSubject = async () => {
    try {
      const subjects = await axios.get("http://localhost:3000/take-subject");
      let jsonData = subjects.data;
      setSubjects(jsonData);
    } catch (err) {
      console.log("faild to fetch subjects", err);
    }
  };

  const filteredQuestions = selectedSubject
    ? questions.filter((q) => q?.SubjectPaper?.subject_name === selectedSubject)
    : [];

  //console.log(filteredQuestions);

  const showToast = (msg) => {
    setErrorMessage(msg);
    setShowError(true);
    setTimeout(() => setShowError(false), 4000); // hide after 4 sec
  };

  const handleAddQuestion = async (eachQuestionId, question_group) => {
    try {
      const res = await axios.post("/add-question", {
        eachQuestionId,
      });
      //console.log("each question id : ", res);
      dispatch(addQuestion({ eachQuestionId, group: question_group }));
    } catch (err) {
      if (err?.response?.status && err?.status === 400) {
        showToast(err.response.data.error);
      }
      //console.log("faild to add question-id", err);
    }
  };

  const handleRemoveQuestion = async (eachQuestionId, question_group) => {
    try {
      await axios.post("/remove-question", { eachQuestionId });

      dispatch(removeQuestion({ eachQuestionId, group: question_group }));
    } catch (err) {
      console.log("Question remove faild", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-3xl font-extrabold mb-6 text-center text-blue-900">
        Select Subject
      </h2>

      <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 mb-10">
        {subjects.map((subj) => (
          <button
            key={subj?.id}
            onClick={() => setSelectedSubject(subj?.subject_name)}
            className={`px-6 py-3 text-xl sm:text-2xl rounded-lg font-semibold tracking-wide transition-all duration-300 shadow-md border 
        ${
          selectedSubject === subj?.subject_name
            ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white border-blue-800 scale-105"
            : "bg-white text-gray-700 hover:bg-blue-100 border-gray-300"
        }`}
          >
            {subj.subject_name.toUpperCase()}
          </button>
        ))}
      </div>

      {showError && (
        <div className="fixed top-16 right-4 bg-red-800 text-white px-6 py-3 rounded shadow-lg animate-bounce-in">
          ⚠️ {errorMessage}
        </div>
      )}

      {selectedSubject && (
        <div className="sticky top-0 ml-6 bg-slate-300 shadow-md z-10 rounded-xl">
          <div className="relative flex items-center justify-center py-3">
            {/* Centered Group counts */}
            <div className="text-3xl font-semibold text-teal-900 flex gap-6">
              <span>Group</span>
              <span>A: {groupCounts.A}</span>
              <span>B: {groupCounts.B}</span>
              <span>C: {groupCounts.C}</span>
            </div>

            {/* Right-aligned Show Paper button */}
            <button
              onClick={() => navigate("/dashboard/generate-paper")}
              className="absolute right-60 bg-teal-900 text-white px-4 py-2 rounded-md text-base font-medium hover:bg-teal-700 "
            >
              Show Paper
            </button>
          </div>
        </div>
      )}

      <div className="pl-6 space-y-6 my-4">
        {selectedSubject &&
          (filteredQuestions.length > 0 ? (
            filteredQuestions.map((item, index) => (
              <div
                key={index}
                className={`border rounded-xl p-4 shadow-sm ${
                  highlights.includes(item.id)
                    ? "bg-teal-200 text-black"
                    : "bg-slate-100"
                }`}
              >
                <h2 className="font-bold text-xl text-blue-800 mb-2">
                  Q[{index + 1}].
                </h2>

                <div className="flex gap-8 pl-4">
                  <h2 className="font-bold text-xl text-teal-600 mb-2">
                    Group: {item.question_group}
                  </h2>
                  <h2 className="font-bold text-xl text-teal-600 mb-2">
                    Total: {item.total_marks}
                  </h2>
                  <h2 className="font-bold text-xl text-teal-600 mb-2">
                    {item.difficulty}
                  </h2>
                </div>
                <div className="pl-4 space-y-2 my-4 text-lg">
                  {item.sub_question_marks.map((subq, inx) => (
                    <p key={inx}>
                      {subq.subquestion} ?&nbsp;&nbsp;&nbsp;&nbsp; {subq.marks}
                    </p>
                  ))}
                </div>
                <div className="flex justify-end gap-4">
                  {highlights.includes(item.id) ? (
                    <button
                      onClick={() =>
                        handleRemoveQuestion(item.id, item.question_group)
                      }
                      className="p-3 w-36 cursor-pointer bg-white border border-teal-950 rounded-md text-teal-950 font-semibold text-lg hover:bg-teal-950 hover:text-white"
                    >
                      Remove
                    </button>
                  ) : (
                    <button
                      onClick={() =>
                        handleAddQuestion(item.id, item.question_group)
                      }
                      className="p-3 w-36 cursor-pointer bg-white border border-teal-950 rounded-md text-teal-950 font-semibold text-lg hover:bg-teal-950 hover:text-white"
                    >
                      Add
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 text-lg">
              No questions available.
            </p>
          ))}
      </div>
    </div>
  );
};

export default StoreQuestions;
