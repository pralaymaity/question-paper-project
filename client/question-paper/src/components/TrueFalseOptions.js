
import React from 'react';
import "../style/true_false.css"

const TrueFalseOptions = ({ handleCorrectAnswerChange }) => {
  return (
    <div className="true-false-answere">
      <h3>Select True or False</h3>
      <div className="true-false-category1">
        <h1>Correct Ans</h1>
        <input
          type="radio"
          name="trueFalse"
          value="True"
          onChange={() => handleCorrectAnswerChange(0)} // 0 for True
        />
        <label>True</label>
      </div>
      <div className="true-false-category2">
        <h1>Correct Ans</h1>
        <input
          type="radio"
          name="trueFalse"
          value="False"
          onChange={() => handleCorrectAnswerChange(1)} // 1 for False
        />
        <label>False</label>
      </div>
    </div>
  );
};

export default TrueFalseOptions;
