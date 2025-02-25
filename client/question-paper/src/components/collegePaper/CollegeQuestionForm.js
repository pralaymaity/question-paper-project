import React from "react";
import { useState } from "react";
import axios from "axios";

const CollegeQuestionForm = () => {

  const [form, setForm] = useState({
    subject: "",
    questionText: "",
    difficulty: "easy",
    marks: "",
    group: "A",
  });

  //console.log(form);
  

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("adasdasdasdasdasda");

    try {
      console.log("Before sending request");
      const response = await axios.post("/api/store-question", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        // Ensures cookies or other credentials are sent along with the request
      });
      console.log("🚀 Sending request...");
     
      console.log(response);

      if (response.status === 200) {
        console.log("Question added successfully!");
        alert("Question Added ✔");
      } else {
        console.log("Failed to add question.");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      console.log("Failed to add question.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 space-y-4 bg-white shadow-lg rounded-lg max-w-md mx-auto"
    >
      <select
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        onChange={(e) => setForm({ ...form, subject: e.target.value })}
      >
        <option value="" disabled selected hidden>
          Select Subject
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="java">
          Java
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="python">
          Python
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="gk">
          GK
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="javascript">
          JavaScript
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="operating system">
          Operating System
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="artificial intelligence">
          Artificial Intelligence
        </option>
      </select>

      <textarea
        placeholder="Write Question"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setForm({ ...form, questionText: e.target.value })}
      />

      <select
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
      >
        <option value="" disabled selected hidden>
          Set Difficulty
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="easy">
          Easy
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="moderate">
          Moderate
        </option>
        <option className="text-emerald-600 font-bold text-lg" value="hard">
          Hard
        </option>
      </select>

      <input
        type="text"
        placeholder="Marks"
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => setForm({ ...form, marks: e.target.value })}
      />

      <select
        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        onChange={(e) => setForm({ ...form, group: e.target.value })}
      >
        <option value="" disabled selected hidden>
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
  );
};

export default CollegeQuestionForm;
