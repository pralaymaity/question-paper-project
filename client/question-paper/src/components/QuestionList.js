import "../style/questionList.css";

import { useSelector } from "react-redux";
import Header from "./Header";

const QuestionList = () => {
  const questionList = useSelector((store) => {
    return store.questions.list;
  });

  const AddQuestion = () => {};
  const RemoveQuestion = () => {};

  return (
    <div>
      <Header />

      <div className="question-list">
        <h1>Question List</h1>

        <div className="individual-question">
          {questionList.map((question, index) => {      
            
            return (
              <ul key={index}>
                <li className="question">{question.questionText}</li>

                {/* <li className="category">{question.category}</li> */}

                {question.category === "true/false" && (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="true"
                      />
                      True
                    </label>

                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="false"
                      />
                      False
                    </label>
                  </div>
                )}

                {question.category === "select one" && (
                  <div>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="option1"
                      />
                      Option 1
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="option2"
                      />
                      Option 2
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="option3"
                      />
                      Option 3
                    </label>
                    <label>
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value="option4"
                      />
                      Option 4
                    </label>
                  </div>
                )}

                {question.category === "select two" && (
                  <div>
                    <label>
                      <input
                        type="checkbox"
                        name={`question-${index}-1`}
                        value="option1"
                      />
                      Option 1
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name={`question-${index}-2`}
                        value="option2"
                      />
                      Option 2
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name={`question-${index}-3`}
                        value="option3"
                      />
                      Option 3
                    </label>
                    <label>
                      <input
                        type="checkbox"
                        name={`question-${index}-4`}
                        value="option4"
                      />
                      Option 4
                    </label>
                  </div>
                )}

                <li className="question-btn">
                  <button onClick={AddQuestion}>Add+</button>
                  <button onClick={RemoveQuestion}>Remove</button>
                </li>
              </ul>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
