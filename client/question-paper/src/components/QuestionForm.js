import { useDispatch } from "react-redux";
import "../style/questionForm.css";
import { useState } from "react";
import { addQuestion } from "../utils/questionListSlice";


const QuestionForm = () => {
  
  const dispatch = useDispatch();   // step1 first dispatch an action then step2

  const [questionText, setquestionText] = useState("");
  const [category, setcategory] = useState("");

  const handleQuestionForm = () => {

    if (questionText.trim() === '' || category === '') {
      alert('Please fill in both the question and category.');
      return; 
    }

    dispatch(addQuestion({questionText, category}))
    setquestionText("")
    setcategory("")
  };

  return (
    <div className="question-paper">

      <form
        className="question-form"
        onSubmit={(e) => {
          return e.preventDefault();
        }}
      >
        <div>
          <h2>Add a Question</h2>

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

        </div>

        <button onClick={handleQuestionForm}>Add Questions+</button>
      </form>

      
    </div>
  );
};

export default QuestionForm;
