import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const QuestionStorage = () => {
  const [originalData, setOriginalData] = useState([]);
  console.log(originalData);

  const [filterData, setFilterData] = useState([]);
  //console.log(filterData);

  const [searchText, setSearchText] = useState("");
  //console.log(searchText);
  const [searchMarks, setSearchMarks] = useState("");
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  console.log(selectedQuestions);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure you have the token saved in localStorage or a similar place

      const questionStorage = await axios.get(
        "http://localhost:3000/api/add-question",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Bearer format
          },
        }
      );

      const jsonData = questionStorage.data;
      setOriginalData(jsonData);
      setFilterData(jsonData);
    } catch (error) {
      console.log("Error fetching questions", error);
    }
  };

  const filterQuestions = (id) => {
    setSelectedQuestions((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleNavigateExamForm = () => {
    // Navigate to ExamForm component, passing the selectedQuestions
    navigate('/exam-form', { state: { selectedQuestions } });
  };

  return (
    <div className=" bg-slate-50">
      <div className="py-4 px-8 flex justify-between items-center mb-4">
        <div className="flex space-x-8">
          <input
            className="w-6/12 p-3 rounded-md border text-slate-900  border-blue-500 outline-none"
            type="text"
            value={searchText}
            placeholder="search"
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
          <input
            className="w-6/12 p-3 rounded-md border text-slate-900  border-blue-500 outline-none"
            type="text"
            value={searchMarks}
            placeholder="Marks"
            onChange={(e) => {
              setSearchMarks(e.target.value);
            }}
          />

          <button
            className=" p-3 rounded-md border font-semibold text-slate-900  border-blue-500 outline-none"
            onClick={() => {
              if (searchText.length === 0 || searchMarks.length === 0) {
                alert("⚠ Fill the both fields");
              } else {
                const filterSubject = originalData.filter((sub) => {
                  return sub?.Subject.subject_name
                    ?.toLowerCase()
                    .includes(searchText.toLowerCase());
                });

                const marks = Number.parseInt(searchMarks);
                const finalDataWithMarks = filterSubject.filter((mark) => {
                  return mark?.questions_details?.marks === marks;
                });

                setFilterData(finalDataWithMarks); // Update with the filtered data
                setSearchText("");
                setSearchMarks("");
              }
            }}
          >
            Search
          </button>
        </div>

      <button
        onClick={handleNavigateExamForm}
        className="p-3 rounded-md font-semibold bg-blue-950 border text-white"
      >
        Go to Exam Form
      </button>
      </div>

      <div className="py-4 px-8 space-y-4">
        {filterData.map((list, index) => {
          let correctAns = null;

          if (list.questions_details.category === "true/false") {
            correctAns = list?.questions_details?.answereOptions[0]?.isCorrect
              ? "True"
              : "False";
          } else if (list.questions_details.category === "select two") {
            correctAns = list?.questions_details?.answereOptions
              .filter((correct, idx) => {
                return correct.isCorrect;
              })
              .map((options, idx) => {
                return options.text;
              })
              .join(" , ");
          } else {
            correctAns = list.questions_details.answereOptions.find(
              (option) => {
                return option.isCorrect;
              }
            ).text;
          }

          return (
            <div className="" key={list.id}>
              <ul className="font-semibold text-lg ">
                <li className="font-bold text-xl text-blue-800">
                  Q({index + 1}) {list.question}
                </li>
                <li>Subject : {list.Subject.subject_name}</li>
                <li>Marks : {list.questions_details.marks}</li>
                <li>Difficulty : {list.questions_details.category}</li>

                {list.questions_details.category === "true/false" ? (
                  <li className="text-green-600">
                    {/* Display True or False based on isCorrect */}
                    Correct Answer : {correctAns}
                  </li>
                ) : (
                  <li className="text-green-600">
                    {/* For other categories, display the correct answer text */}
                    Correct Answer :{" "}
                    {correctAns || "No correct answer selected"}
                  </li>
                )}

                <li>Created By : {list.created_by}</li>
              </ul>
              <input
                className="w-5 h-5"
                type="checkbox"
                onChange={() => {
                  filterQuestions(list.id);
                }}
                checked={selectedQuestions.includes(list.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionStorage;
