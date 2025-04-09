import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import {storeQuestion} from "../../utils/collegeQuestionSlice"
const CollegeQuestionForm = () => {
  const [form, setForm] = useState({
    subject: "",
    questionText: "",
    difficulty: "easy",
    marks: "",
    group: "A",
  });

  const subjectList = [
    "Java",
    "Python",
    "GK",
    "JavaScript",
    "Operating System",
    "Artificial Intelligence",
    "Data Structures & Algorithms",
  ];

  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/store-question", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        // Ensures cookies or other credentials are sent along with the request
      });

      console.log(response);

      if (response.status === 201) {
        console.log("Question added successfully!");
        alert("Question Added ✔");
        dispatch(storeQuestion(form));

      } else {
        console.log("Failed to add question.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      console.log("Failed to add question.");
    }

    setForm({
      subject: "",
      questionText: "",
      difficulty: "easy",
      marks: "",
      group: "A",
    });
  };

  return (
    <div>
      <div className="flex justify-center text-4xl ">
        <h3 className="font-bold text-slate-900 ">Question Paper</h3>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-6 my-4 space-y-4 bg-slate-50 shadow-lg rounded-lg max-w-md mx-auto"
      >
        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
        >
          <option value="" hidden>
            Select Subject
          </option>
          {subjectList.map((sub, idx) => {
            return (
              <option
                className="text-emerald-600 font-bold text-lg"
                key={idx}
                value={sub.toLowerCase()}
              >
                {sub}
              </option>
            );
          })}
        </select>

        <textarea
          value={form.questionText}
          placeholder="Write Question"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, questionText: e.target.value })}
        />

        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          <option value="" disabled hidden>
            Set Difficulty
          </option>
          <option className="text-emerald-600 font-bold text-lg" value="easy">
            Easy
          </option>
          <option
            className="text-emerald-600 font-bold text-lg"
            value="moderate"
          >
            Moderate
          </option>
          <option className="text-emerald-600 font-bold text-lg" value="hard">
            Hard
          </option>
        </select>

        <input
          type="text"
          value={form.marks}
          placeholder="Marks"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setForm({ ...form, marks: e.target.value })}
        />

        <select
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
          value={form.group}
          onChange={(e) => setForm({ ...form, group: e.target.value })}
        >
          <option value="" disabled hidden>
            Select Group
          </option>
          <option className="text-emerald-600 font-bold text-lg" value="A">
            A
          </option>
          <option className="text-emerald-600 font-bold text-lg" value="B">
            B
          </option>
          <option className="text-emerald-600 font-bold text-lg" value="C">
            C
          </option>
        </select>

        <button
          type="submit"
          className="w-full p-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Add Question
        </button>
      </form>
    </div>
  );
};

export default CollegeQuestionForm;
