import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AnswerOptions from "./AnswerOptions";
import TrueFalseOptions from "./TrueFalseOptions";
import { addQuestion } from "../../utils/questionListSlice";
import axios from "axios";
import SideBar from "./SideBar";

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
  }, [category]);

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
      const response = await axios.post(
        "http://localhost:9000/api/add-question",
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-blue-100 py-10 px-4">
      <SideBar />
      <form
        className="relative mx-auto bg-white shadow-2xl py-12 px-10 w-full max-w-4xl rounded-2xl border border-gray-200 transition-all duration-300"
        onSubmit={(e) => e.preventDefault()}
      >
        <h2 className="text-4xl text-center font-bold text-blue-900 mb-8">
          📋 Question Form
        </h2>

        {questionSuccess && (
          <div className="fixed top-24 right-4 bg-green-700 text-white px-6 py-3 rounded-lg shadow-lg animate-fade-in">
            <div>{questionSuccess}</div>
            <div className="mt-2 h-1 bg-white rounded overflow-hidden relative">
              <div className="absolute top-0 left-0 h-full bg-green-600 animate-toast-progress w-full"></div>
            </div>
          </div>
        )}

        <div className="space-y-6">
          {/* Subject Selector */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Subjects:
            </label>
            <select
              className="w-full p-3 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="" disabled hidden>
                Select a subject
              </option>
              {subjectList.map((subj, index) => (
                <option key={index} value={subj.toLowerCase()}>
                  {subj}
                </option>
              ))}
            </select>
          </div>

          {/* Question Input */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Question:
            </label>
            <input
              className="w-full p-3 rounded-md border border-blue-400 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
              type="text"
              placeholder="Enter your question here..."
              required
              value={questionText}
              onChange={(e) => setquestionText(e.target.value)}
            />
          </div>

          {/* Category Selector */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-1">
              Category:
            </label>
            <select
              className="w-full p-3 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
              value={category}
              onChange={(e) => setcategory(e.target.value)}
            >
              <option value="">Select category</option>
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

          {/* Difficulty and Marks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Difficulty:
              </label>
              <select
                className="w-full p-3 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={difficulty}
                onChange={(e) => setdifficulty(e.target.value)}
              >
                <option value="">Select difficulty</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-1">
                Marks:
              </label>
              <select
                className="w-full p-3 rounded-md border border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-600"
                value={marks}
                onChange={(e) => setmarks(e.target.value)}
              >
                <option value="">Select marks</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center mt-8">
            <button
              className="bg-blue-700 hover:bg-blue-900 transition-colors duration-300 text-white px-8 py-3 text-lg font-semibold rounded-md shadow-md"
              onClick={handleQuestionForm}
            >
              ➕ Add Question
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default QuestionForm;
