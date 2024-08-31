import { useDispatch } from "react-redux";
import "../style/questionForm.css";
import { useState, useEffect } from "react";
import { addQuestion } from "../utils/questionListSlice";
import axios from "axios";

const QuestionForm = () => {
  const dispatch = useDispatch();

  const [questionText, setquestionText] = useState("");
  const [category, setcategory] = useState("");
  const [answereOptions, setanswereOptions] = useState([
    { text: "", isCorrect: false },
  ]); // State for options
  
  // Handle adding new options to answereOptions
  const handleAddOption = () => {
    if (answereOptions.length < 4) {
      setanswereOptions([...answereOptions, { text: "", isCorrect: false }]);
    } else {
      alert("⚠ Only four option can be added");
    }
  };

  // Handle option text change
  const handleOptionChange = (index, value) => {
    const newOptions = [...answereOptions];
    newOptions[index].text = value;
    setanswereOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    console.log(index , category);
    
    if (category === "select one" || category === "true/false") {
      
      const newOptions = answereOptions.map((option, idx) => ({
        ...option,
        isCorrect: idx === index, // Set to true only for the selected option, false for others
      }));
      console.log(newOptions);
      
      setanswereOptions(newOptions);
    }
     else if (category === "select two") {
      
    }
  };

  const handleQuestionForm = async () => {
    if (questionText.trim() === "" || category === "") {
      alert("Please fill in both the question and category.");
      return;
    }

    const questionData = {
      questionText,
      category,
      answereOptions,
      
    };
    dispatch(addQuestion(questionData));
    console.log(questionData);

    // try {
    //   await axios.post("http://localhost:9000/questions", questionData);
    //   console.log("Question added successfully!");
    //   setquestionText("");
    //   setcategory("");
    //   setanswereOptions([{ text: "" }]);
    //   setCorrectAnswer([]);
    // } catch (error) {
    //   console.error("Error adding question:", error);
    //   alert("Failed to add question.");
    // }
  };

  return (
    <div className="question-paper">
      <form
        className="question-form"
        onSubmit={(e) => {
          return e.preventDefault();
        }}
      >
        <div className="form-details">
          <h2 className="form-heading">Question Form</h2>

          <input
            className="q1"
            type="text"
            placeholder="Enter a Question..."
            required
            value={questionText}
            onChange={(e) => setquestionText(e.target.value)}
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setcategory(e.target.value)}
          >
            <option value=""></option>
            <option value="true/false">True/False</option>
            <option value="select one">Select One</option>
            <option value="select two">Select Two</option>
          </select>

          {category === "true/false" && (
            <div className="true-false-answere ">
              <h3>Select True or False</h3>
              <div className="true-false-category">
                <input
                  type="radio"
                  name="trueFalse"
                  
                  
                />
                <label>True</label>
              </div>
              <div className="true-false-category">
                <input
                  type="radio"
                  name="trueFalse"
                 
                  
                />
                <label>False</label>
              </div>
            </div>
          )}

          {(category === "select one" || category === "select two") && (
            <div className="answereOptions">
              <h3>Answere Options</h3>

              {answereOptions.map((option, index) => (
                <div key={index} className="option-item">
                  <input
                    type="text"
                    value={option.text}
                    placeholder={`Option ${index + 1}`}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                  />

                  {category === "select one" ? (
                    <div className="single-answere">
                      <h1>Correct Ans</h1>
                      
                      <input 
                        type="radio"
                        name="correctAnswer"
                        checked={option.isCorrect}
                        onChange={() => handleCorrectAnswerChange(index)}
                      />
                    </div>
                  ) : (
                    category === "select two" && (
                      <div className="two-answere">
                        <h1>Correct Answeres</h1>
                        <input
                          type="checkbox"
                          
                          onChange={() => handleCorrectAnswerChange(index)}
                        />
                      </div>
                    )
                  )}
                </div>
              ))}

              <button type="button" onClick={handleAddOption}>
                Add Option
              </button>
            </div>
          )}
        </div>

        <button className="Add-Questions" onClick={handleQuestionForm}>
          Add Questions+
        </button>
      </form>
    </div>
  );
};

export default QuestionForm;
