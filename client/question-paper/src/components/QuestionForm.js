import React, { useEffect, useState } from "react";
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

  console.log(answereOptions);

  const [questionSuccess, setQuestionSuccess] = useState("");

  const subjectList = ["Java", "Python", "JavaScript", "GK", "DBMS"];

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

  useEffect(() => {
    if (category === "true/false") {
      setanswereOptions([
        { text: "True", isCorrect: false },
        { text: "False", isCorrect: false },
      ]);
    }
  },[category]);   

  const handleCorrectAnswerChange = (index) => {
    // here index comes from answereOptions index

    if (category === "select one" || category === "true/false") {

      const newOptions = answereOptions.map((option, idx) => ({
        ...option,
        isCorrect: idx === index,
      }));
      setanswereOptions(newOptions);
      

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

  const showToast = (msg) => {
    setQuestionSuccess(msg);
    setTimeout(() => {
      setQuestionSuccess("");
    }, 3000);
  };

  const handleQuestionForm = async () => {
    if (questionText.trim() === "" || category === "" || marks === "") {
      alert("⚠Please fill in both the question and category and marks⚠");
      return;
    }

    // Validation: Check if a correct answer is selected
    const hasCorrectAnswer = answereOptions.some((option) => option.isCorrect);

    if (!hasCorrectAnswer) {
      alert("⚠Please select the correct ans⚠");
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
        showToast("Question added✔");
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
    <div className="">
      <form
        className=" relative  mx-auto bg-slate-50 py-12  w-8/12   rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="space-y-12 ">
          <div className="border-b border-gray-900/10 pb-12">
            <h2 className="text-4xl text-center  font-bold leading-7 text-gray-900">
              Question Form
            </h2>

            {questionSuccess && (
              <div className="fixed top-24 right-2 bg-green-800 text-white px-4 py-2 rounded shadow-lg ">
                <div>{questionSuccess}</div>
                <div className="mt-2 h-1 bg-white relative overflow-hidden rounded">
                  <div className="absolute top-0 left-0 h-full bg-green-800 animate-toast-progress"></div>
                </div>
              </div>
            )}

            <div className="my-6 px-6">
              <div className="my-4">
                <label className="font-semibold text-2xl text-amber-500">
                  Subjects:
                </label>
                <select
                  className="font-semibold text-lg text-red-900 border mx-3 border-blue-500 rounded focus:outline-none px-2 py-1"
                  value={subject} // Controlled component
                  onChange={(e) => setSubject(e.target.value)}
                >
                  <option value="" disabled hidden></option>
                  {subjectList.map((subj, index) => (
                    <option key={index} value={subj.toLowerCase()}>
                      {subj}
                    </option>
                  ))}
                </select>
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
