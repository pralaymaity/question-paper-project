import axios from "axios";
import React, { useEffect, useState } from "react";

const StoreQuestions = () => {
  const [subjects, setSubjects] = useState([]);
  //console.log(subjects);

  const [questions, setQuestions] = useState([]);
  //console.log(questions);

  const [selectedSubject, setSelectedSubject] = useState(null);

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

    console.log(filteredQuestions);
    
  

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Select Subject:</h2>

      <div className="flex gap-4 mb-6 flex-wrap">
        {subjects.map((subj) => (
          <button
            key={subj?.id}
            onClick={() => setSelectedSubject(subj?.subject_name)}
            className={`px-4 py-2 rounded-md font-semibold ${
              selectedSubject === subj?.subject_name
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            {subj?.subject_name}
          </button>
        ))}
      </div>

      <div>

        <h3 className="text-xl font-semibold mb-2">Questions:</h3>

        {filteredQuestions.length === 0 ? (
          <p>No questions found for "{selectedSubject}"</p>
        ) : (
          <div className=" pl-6 space-y-6">
            {filteredQuestions.map((item, index) => (

              <div key={index} className=" border rounded p-4">

                <h2 className="font-bold text-xl">Q[ {index + 1} ]</h2>

                <div className="pl-4 space-y-2 my-4 text-lg">
                  {item.sub_question_marks.map((subq , inx)=>(
                    <p key={inx}>{subq.subquestion} ?&nbsp;&nbsp;&nbsp;&nbsp; {subq.marks}</p>
                  ))}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StoreQuestions;
