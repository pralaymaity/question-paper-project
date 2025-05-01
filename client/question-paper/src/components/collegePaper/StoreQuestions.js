import axios from "axios";
import React, { useEffect, useState } from "react";

const StoreQuestions = () => {
  const [subjects, setSubjects] = useState([]);
  //console.log(subjects);
  const [questions, setQuestions] = useState([]);
  //console.log(questions);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);
  const [groupCounts, setGroupCounts] = useState({ A: 0, B: 0, C: 0 });
  //console.log(groupCounts);
  const [highlights, setHighlights] = useState([]);

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

      setGroupCounts((prev) => ({
        ...prev,
        [question_group]: prev[question_group] + 1,
      }));

      setHighlights((prev)=> [...prev, eachQuestionId])
      

    } catch (err) {
      if (err?.response?.status && err?.status === 400) {
        showToast(err.response.data.error);
      }

      //console.log("faild to add question-id", err);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Subject:</h2>

      <div className="flex flex-wrap gap-8 mb-6 justify-center ">
        {subjects.map((subj) => (
          <button
            key={subj?.id}
            onClick={() => setSelectedSubject(subj?.subject_name)}
            className={`px-4 py-2 font-semibold text-2xl rounded-md hover:bg-blue-600 ${
              selectedSubject === subj?.subject_name
                ? "bg-blue-600 text-white "
                : "bg-gray-200 text-black"
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
          <div className=" py-3 text-center space-x-4 text-4xl text-teal-900 ">
            <span className="font-semibold">Group</span>
            <span>A: {groupCounts.A}</span>
            <span>B: {groupCounts.B}</span>
            <span>C: {groupCounts.C}</span>
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
                  highlights.includes(item.id)  ? "bg-teal-200 text-black" : "bg-slate-100"
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
                <div className="flex justify-end">
                  <button
                    onClick={() =>
                      handleAddQuestion(item.id, item.question_group)
                    }
                    className="p-3 w-36 cursor-pointer bg-white border border-teal-950 rounded-md text-teal-950 font-semibold text-lg hover:bg-teal-950 hover:text-white"
                  >
                    Add
                  </button>
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
