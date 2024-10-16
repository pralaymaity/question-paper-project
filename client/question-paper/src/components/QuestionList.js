import "../style/questionList.css";

import { useDispatch, useSelector } from "react-redux";
import { removeQuestion } from "../utils/questionListSlice";

const QuestionList = () => {

  const questionList = useSelector((store) => {
    return store.questions.list;
  });
  console.log(questionList);

  const dispatch = useDispatch();

  const AddQuestion = () => {

  };

  const RemoveQuestion = () => {
    dispatch(removeQuestion());
  };

  return (
    
      <div className="question-list">
        <h1>Question List</h1>

        <div className="individual-question">
          
          {questionList.map((question, index) => {

            let correctAnswer;

            if (question.category === "true/false") {
              // For true/false, assume the first option is True and the second option is False
              correctAnswer = question.answereOptions[0].isCorrect
                ? "True"
                : "False";
            } else if (question.category === "select two") {

              correctAnswer = question.answereOptions.filter((option) => {
                  return option.isCorrect;
                }).map((option) => {
                  return option.text;
                }).join(", "); // Join multiple correct answers with a comma
                              
            } else {
              // For other categories, find a single correct answer based on isCorrect
              correctAnswer = question.answereOptions.find(
                (option) => option.isCorrect
              )?.text;
            }

            return (
              <div className="question-info" key={index}>
                <h1 className="question">
                  Q{index + 1}. {question.questionText}
                </h1>
                <div className="question-details-list">
                  <ul className="list">
                    <li className="q-subject">
                      Subject: <span>{question.subject}</span>
                    </li>

                    <li className="q-level">
                      Difficulty: <span>{question.difficulty}</span>
                    </li>

                    <li className="q-marks">
                      Marks: <span>{question.marks}</span>
                    </li>

                    <li className="q-category">
                      Category: <span>{question.category}</span>
                    </li>

                   <li>
                      Options:{" "}
                      <span>{question.answereOptions.map((option) => option.text).join(", ")}</span>
                   </li>

                    {question.category === "true/false" ? (
                      <li className="q-category">
                        {/* Display True or False based on isCorrect */}
                        Correct Answer:{" "} <span>{correctAnswer}</span>
                      </li>
                    ) : (
                      <li className="q-category">
                        {/* For other categories, display the correct answer text */}
                        Correct Answer:{" "}
                        <span>
                          {correctAnswer || "No correct answer selected"}
                        </span>
                      </li>
                    )}
                  </ul>
                  <li className="question-btn">
                    <button onClick={AddQuestion}>Add+</button>
                    <button onClick={RemoveQuestion}>Remove</button>
                  </li>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    
  );
};

export default QuestionList;
