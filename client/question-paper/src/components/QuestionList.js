import "../style/questionList.css";

import { useSelector } from "react-redux";


const QuestionList = () => {
  const questionList = useSelector((store) => {
    return store.questions.list;
  });

  const AddQuestion = () => {};
  const RemoveQuestion = () => {};

  return (
    <div>
     

      <div className="question-list">
        <h1>Question List</h1>

        <div className="individual-question">
          {questionList.map((question, index) => {
            return (
              <ul key={index}>
                <li className="question">Q{index +1}. {question.questionText} </li>

                {/* <li className="category">{question.category}</li> */}

                {question.category === "true/false" && (
                  <div className="category1">
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
                  <div className="category2-3">
                    {question.answereOptions.map((options, optIndex) => {
                      return (
                        <div key={optIndex}>
                          <label>
                            <input
                              type="radio"
                              name={`question-${index}`}
                              value={options.text}
                            />
                            {options.text}
                          </label>
                        </div>
                      );
                    })}
                  </div>
                )}

                {question.category === "select two" && (
                  <div className="category2-3">
                    {question.answereOptions.map((options, optIndex) => {
                      return (
                        <div key={optIndex}>
                          <label>
                            <input
                              type="checkbox"
                              name={`question-${index}`}
                              value={options.text}
                            />
                            {options.text}
                          </label>
                        </div>
                      );
                    })}
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
