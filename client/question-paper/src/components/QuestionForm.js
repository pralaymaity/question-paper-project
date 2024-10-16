import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AnswerOptions from "./AnswerOptions";
import TrueFalseOptions from "./TrueFalseOptions";
import { addQuestion } from "../utils/questionListSlice";
import axios from "axios";
import "../style/questionForm.css";

const QuestionForm = () => {
  const dispatch = useDispatch();

  const [questionText, setquestionText] = useState("");
  const [subject, setSubject] = useState("");
  const [category, setcategory] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [marks, setmarks] = useState("");
  const [answereOptions, setanswereOptions] = useState([
    { text: "", isCorrect: false },
  ]);
  //console.log(answereOptions);
  const token = localStorage.getItem('token');

  const handleAddOption = () => {

    let maxOptions = 4; 

    
    if (category === "select two") {
      maxOptions = 5;
    }
  
    if (answereOptions.length < maxOptions) {
      setanswereOptions([...answereOptions, { text: "", isCorrect: false }]);
    } else {
      alert(`⚠ Only ${maxOptions} options can be added`);
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...answereOptions];
    newOptions[index].text = value;
    //console.log(newOptions.text);
    
    setanswereOptions(newOptions);
  };

  const handleCorrectAnswerChange = (index) => {
    // here index comes from answereOptions index

    if (category === "select one" || category === "true/false") {

      const newOptions = answereOptions.map((option, idx) => ({
        ...option, //(spread opraton) It creates a new object that includes everything from the original option
        isCorrect: idx === index, //If the correct option's index (idx) matches the selected index (index), isCorrect is set to true
      }));
      setanswereOptions(newOptions);
      //console.log(newOptions);

    } else if (category === "select two") {

      const newOptions = answereOptions.map((option, idx) => {
        // Toggle the isCorrect value for the selected option
        if (idx === index) {
          return { ...option, isCorrect: !option.isCorrect };
          //spread operator
        }
        return option;
      });
       console.log(newOptions);

      setanswereOptions(newOptions);
    }
  };

  const handleQuestionForm = async () => {
    if (questionText.trim() === "" || category === "") {
      alert("Please fill in both the question and category.");
      return;
    }

    const questionData = {
      questionText,
      subject,
      difficulty,
      marks,
      category,
      answereOptions,
    };
    try {
      const response = await axios.post('/api/add-question', questionData ,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
         withCredentials: true, 
         // Ensures cookies or other credentials are sent along with the request
      });

      if (response.status === 200) {
        console.log('Question added successfully!');
        alert("Question Added ✔")
      } else {
        console.log('Failed to add question.');
      }
      console.log(response);
    } 
    catch (error) {
      console.error('Error adding question:', error);
      console.log('Failed to add question.');
    }
     //console.log(response);

    dispatch(addQuestion(questionData));

    setquestionText("");
    setcategory("");
    setmarks("");
    setdifficulty("");
    setSubject("");
    setanswereOptions([{ text: "", isCorrect: false }]);
  };

  return (
    <div className="question-paper">
      <form className="question-form" onSubmit={(e) => e.preventDefault()}>
        <div className="form-details">
          <h2 className="form-heading">Question Form</h2>

          <div className="question-details">
            <div className="question-subject">
              <label>Subjects</label>

              <select
                value={subject}
                onChange={(e) => {
                  setSubject(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="java">Java</option>
                <option value="python">Python</option>
                <option value="javascript">JavaScript</option>
                <option value="gk">General Knowledge</option>
                <option value="dbms">Dbms</option>
              </select>
            </div>

            <div className="question-difficulty">
              <label>Difficulty</label>

              <select
                value={difficulty}
                onChange={(e) => {
                  setdifficulty(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div className="question-marks">
              <label>Marks</label>
              <select
                value={marks}
                onChange={(e) => {
                  setmarks(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          <div className="question-submit">
            <div className="question-input">
              <input
                className="q1"
                type="text"
                placeholder="Enter a Question..."
                required
                value={questionText} // Sets the currently selected value
                onChange={(e) => setquestionText(e.target.value)}
              />
            </div>

            <div className="question-category">
              <label>Category</label>
              <select
                value={category}
                onChange={(e) => {
                  setcategory(e.target.value);
                }}
              >
                <option value=""></option>
                <option value="true/false">True/False</option>
                <option value="select one">Select One</option>
                <option value="select two">Select Two</option>
              </select>

              {category === "true/false" && (
                <TrueFalseOptions
                  handleCorrectAnswerChange={handleCorrectAnswerChange}
                />
              )}

              {(category === "select one" || category === "select two") && (
                <AnswerOptions
                  answereOptions={answereOptions}
                  category={category}
                  handleAddOption={handleAddOption}
                  handleOptionChange={handleOptionChange}
                  handleCorrectAnswerChange={handleCorrectAnswerChange}
                />
              )}
            </div>
          </div>
          <button className="Add-Questions" onClick={handleQuestionForm}>
            Add Questions+
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
