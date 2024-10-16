import React from 'react';
import "../style/optionItem.css"

const OptionItem = ({ index, option, category, handleOptionChange, handleCorrectAnswerChange }) => {
  return (
    <div className="option-item">
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
            <h1>Correct Ans</h1>
            <input
              type="checkbox"
              checked={option.isCorrect}
              onChange={() => handleCorrectAnswerChange(index)}
            />
          </div>
        )
      )}
    </div>
  );
};

export default OptionItem;
