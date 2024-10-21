import React from "react";
import "../style/true_false.css";

const TrueFalseOptions = ({ handleCorrectAnswerChange }) => {
  return (
    <div className="p-6 my-2 ">
      <p className="font-semibold text-lg text-blue-700">
        Select True or False
      </p>

      <div className="flex items-center">
        <p className="font-semibold text-lg text-green-600 mx-2">Correct Ans</p>
        <label className="m-1 flex items-center space-x-3">
          <input
            className="w-6 h-6 text-blue-600 form-radio"
            type="radio"
            name="trueFalse"
            value="True"
            onChange={() => handleCorrectAnswerChange(0)} // 0 for True
          />
          <span className="text-cyan-600 text-lg font-semibold">True</span>
        </label>
      </div>
      <div className="flex items-center">
        <p className="font-semibold text-lg text-green-600 mx-2">Correct Ans</p>
        <label className="m-1 flex items-center space-x-3">
          <input
            className="w-6 h-6 text-blue-600 form-radio"
            type="radio"
            name="trueFalse"
            value="False"
            onChange={() => handleCorrectAnswerChange(1)} // 1 for False
          />
          <span className="text-cyan-600 text-lg font-semibold">False</span>
        </label>
      </div>
    </div>
  );
};

export default TrueFalseOptions;
