import axios from "axios";
import React, { useEffect, useState } from "react";

const GeneratePpaer = () => {
  const [questions, setQuestions] = useState([]);
  

   console.log(questions);
  // console.log("GroupC question:", questions?.GroupC?.question);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/get-paper");

      let jsonData = res?.data?.paper;
      setQuestions(jsonData);

    } catch (err) {
      console.log("data failed to load", err);
    }
  };

  const resetData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/reset-paper");

      setQuestions(res.data)
      console.log("paper reset");
      
      
    } catch (err) {
      console.log("data failed to reset", err);
    }
  };

  return (
    <div className="bg-slate-50 py-4">
      <div className="m-4 p-3">
        {Array.isArray(questions?.GroupA) && questions.GroupA.length > 0 ? (
          <div>
            <h2>Group A</h2>
            <ul>
              {questions.GroupA.map((ques, idx) => (
                <li key={ques.id}>
                  {idx + 1}. {ques.question}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No questions in Group A</p>
        )}
      </div>

      <div className="m-4 p-3">
        {Array.isArray(questions?.GroupB) && questions.GroupB.length > 0 ? (
          <div>
            <h2>Group B</h2>
            <ul>
              {questions.GroupB.map((ques, idx) => (
                <li key={ques.id}>
                  {idx + 2}. {ques.question}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No questions in Group B</p>
        )}
      </div>

      <div className="m-4 p-3">
        {Array.isArray(questions?.GroupC) && questions.GroupC.length > 0 ? (
          <div>
            <h2>Group C</h2>
            <ul>
              {questions?.GroupC.map((ques, idx) => (
                <li key={ques.id}>
                  {idx + 5}.
                  {ques.question?.split("\n").map((line, i) => (
                    <div key={i}>{line}</div>
                  ))}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>No questions in Group C</p>
        )}
      </div>

      <div className="m-4 p-4">
        <button className="p-3 w-36 cursor-pointer bg-white border border-teal-950 rounded-md text-teal-950 font-semibold text-lg"
         onClick={resetData}>
          Reset Paper
         </button>
      </div>
    </div>
  );
};

export default GeneratePpaer;
