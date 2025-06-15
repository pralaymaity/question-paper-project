import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const QuestionStorage = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [originalData, setOriginalData] = useState([]);

  const [filterData, setFilterData] = useState([]);

  const [searchText, setSearchText] = useState("");

  const [searchMarks, setSearchMarks] = useState("");

  const [selectedQuestionsIds, setselectedQuestionsIds] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token"); // Ensure you have the token saved in localStorage or a similar place
      //console.log(token);

      const questionStorage = await axios.get(
        `${apiUrl}/api/get-question`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Bearer format
          },
        }
        // If you include headers (like the Authorization header) in any HTTP request (GET, POST, PUT, DELETE, etc.),
        // they will automatically be sent to the server along with the request.
      );

      const jsonData = questionStorage.data;
      setOriginalData(jsonData);
      setFilterData(jsonData);
    } catch (error) {
      console.log("Error fetching questions", error);
    }
  };

  const filterQuestions = (id) => {
    setselectedQuestionsIds((prev) =>
      prev.includes(id) ? prev.filter((q) => q !== id) : [...prev, id]
    );
  };

  const handleNavigateExamForm = () => {
    
    //console.log(selectedQuestionsIds);

    navigate("/dashboard/exam-form", { state: { selectedQuestionsIds } });
    // now go to Exam form component and console the useLocation variable.
  };

  return (
    <div className=" bg-slate-50">
      <div className="py-4 px-8 flex justify-between items-center mb-4">
        <div className="flex space-x-8">
          <input
            className="w-6/12 p-3 rounded-md border text-slate-900  border-blue-500 outline-none"
            type="text"
            value={searchText}
            placeholder="Search Subject"
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
                <li>Difficulty : {list.difficulty}</li>
                <li>Category : {list.questions_details.category}</li>
                <li className="text-amber-600">
                  Options :{" "}
                  {list?.questions_details?.answereOptions
                    ?.map((option) => option.text)
                    .join(", ")}
                </li>

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
                checked={selectedQuestionsIds.includes(list.id)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QuestionStorage;
