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

  const token = localStorage.getItem("token");

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
      const response = await axios.post("/api/add-question", questionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        // Ensures cookies or other credentials are sent along with the request
      });

      if (response.status === 200) {
        console.log("Question added successfully!");
        alert("Question Added ✔");
      } else {
        console.log("Failed to add question.");
      }
      console.log(response);
    } catch (error) {
      console.error("Error adding question:", error);
      console.log("Failed to add question.");
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
    <div className=" h-[600px]">
      <form
        className="absolute bg-slate-50 my-10 w-8/12 right-0 left-0 mx-auto rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-12 my-7">
          <div class="border-b border-gray-900/10 pb-12">
            <h2 className="text-4xl text-center  font-bold leading-7 text-gray-900">
              Question Form
            </h2>

            <div className="my-6 px-6">
              <div className="my-4">
                <label className="font-semibold text-2xl text-amber-500 ">
                  Subjects :
                  <select
                    className="font-semibold text-lg text-red-900 border mx-3 border-blue-500 rounded focus:outline-none "
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
                </label>
              </div>

              <div className="my-4">
                <input
                  className="w-6/12 p-4 rounded-md border text-slate-900  border-blue-500 outline-none "
                  type="text"
                  placeholder="Enter a Question..."
                  required
                  value={questionText} // Sets the currently selected value
                  onChange={(e) => setquestionText(e.target.value)}
                />
              </div>

              <div className="my-4">
                <label className="font-semibold text-2xl text-amber-500 ">
                  Category :
                </label>
                <select
                  className="font-semibold text-lg text-red-900 border mx-3 border-blue-500 rounded
                   focus:outline-none "
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
              <div className="flex items-center space-x-4">
                <div className="question-difficulty">
                  <label className="font-semibold text-2xl text-amber-500">
                    Difficulty :
                  </label>

                  <select
                    className="font-semibold text-lg text-red-900 border mx-3 border-blue-500 rounded
                   focus:outline-none "
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

                <div className="">
                  <label className="font-semibold text-2xl text-amber-500">
                    Marks :
                  </label>
                  <select
                    className="font-semibold text-lg text-red-900 border mx-3 border-blue-500 rounded
                   focus:outline-none "
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
              <div className="my-6">
                <button
                  className="my-6 px-6 py-1 font-semibold text-lg rounded-md bg-blue-950 border  text-white"
                  onClick={handleQuestionForm}
                >
                  Add Questions+
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
