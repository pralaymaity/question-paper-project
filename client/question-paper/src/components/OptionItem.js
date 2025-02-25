import React from "react";
import "../style/optionItem.css";

const OptionItem = ({
  index,
  option,
  category,
  handleOptionChange,
  handleCorrectAnswerChange,
}) => {
  return (
    <div className="my-4">
      <input
        className="w-6/12 border border-blue-400 p-1 rounded outline-none"
        type="text"
        value={option.text}
        placeholder={`Option ${index + 1}`}
        onChange={(e) => handleOptionChange(index, e.target.value)}
      />

      {category === "select one" ? (
        <div className="flex items-center my-1 space-x-3">
          <p className="font-semibold text-lg text-green-600 mx-2">
            Correct Ans
          </p>

          <input
            className="w-6 h-6 text-blue-600 form-radio "
            type="radio"
            name="correctAnswer"
            checked={option.isCorrect}
            onChange={() => handleCorrectAnswerChange(index)}
          />
        </div>
      ) : (
        category === "select two" && (
          <div className="flex items-center my-1 space-x-3">
            <p className="font-semibold text-lg text-green-600 mx-2">
              Correct Ans
            </p>
            <input
              className="w-5 h-5  text-blue-600 form-checkbox"
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
