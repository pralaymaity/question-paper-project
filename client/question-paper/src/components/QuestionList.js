import { useLocation } from "react-router-dom";
import "../style/questionList.css";

import { useSelector } from "react-redux";

const QuestionList = () => {
  const questionList = useSelector((store) => {
    return store.questions.list;
  });
  //console.log(questionList);

  const collegeQuestionList = useSelector((store) => {
    return store.collegeQuestion.collegeQuestionStorage;
  });
  console.log(collegeQuestionList);

  const location = useLocation();

  return (
    <div className="bg-slate-50 py-4">
      <h1 className="text-4xl text-center  font-bold leading-7 text-gray-900  ">
        Question List
      </h1>

      <div className="my-6 px-6 py-4 space-y-4 ">
        {location.pathname === "/dashboard/questionform/questionlist" && (
          <div>
            {questionList.map((question, index) => {
              let correctAnswer;

              if (question.category === "true/false") {
                // For true/false, assume the first option is True and the second option is False
                correctAnswer = question.answereOptions[0].isCorrect
                  ? "True"
                  : "False";
              } else if (question.category === "select two") {
                correctAnswer = question.answereOptions
                  .filter((option) => {
                    return option.isCorrect;
                  })
                  .map((option) => {
                    return option.text;
                  })
                  .join(", "); // Join multiple correct answers with a comma
              } else {
                // For other categories, find a single correct answer based on isCorrect
                correctAnswer = question.answereOptions.find(
                  (option) => option.isCorrect
                )?.text;
              }

              return (
                <div key={index}>
                  <h1 className="font-bold text-lg text-red-950">
                    Q{index + 1}. {question.questionText}
                  </h1>
                  <div>
                    <ul className="text-lg text-gray-500">
                      <li>
                        Subject: <span>{question.subject}</span>
                      </li>

                      <li>
                        Difficulty: <span>{question.difficulty}</span>
                      </li>

                      <li>
                        Marks: <span>{question.marks}</span>
                      </li>

                      <li>
                        Category: <span>{question.category}</span>
                      </li>

                      <li>
                        Options:{" "}
                        <span>
                          {question.answereOptions
                            .map((option) => option.text)
                            .join(", ")}
                        </span>
                      </li>

                      {question.category === "true/false" ? (
                        <li className="text-green-600">
                          {/* Display True or False based on isCorrect */}
                          Correct Answer: <span>{correctAnswer}</span>
                        </li>
                      ) : (
                        <li className="text-green-600">
                          {/* For other categories, display the correct answer text */}
                          Correct Answer:{" "}
                          <span>
                            {correctAnswer || "No correct answer selected"}
                          </span>
                        </li>
                      )}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {location.pathname === "/dashboard/college-question-form/questionlist" && (
          
          <div className=" pl-6 space-y-6">
            {collegeQuestionList.map((item, index) => (
              <div key={index} className=" border rounded p-4 border-teal-500">
                <h2 className="font-bold text-xl">Q[ {index + 1} ]</h2>

                <div className="pl-4 space-y-2 my-4 text-lg">
                  <p className="text-2xl text-gray-950 font-bold ">Subject: {item.subject}</p>
                  <p>Group: {item.group}</p>
                </div>

                <div className="pl-4 space-y-2 my-4 text-lg">
                  {item.questionText.split("\n").map((line, idx) => (
                    <p key={idx} className="text-sky-900">
                      {line}
                    </p>
                  ))}
                  <p className="text-sm text-gray-600 italic">
                    Marks: {item.marks}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuestionList;
