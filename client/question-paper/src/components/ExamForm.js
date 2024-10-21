import { useLocation } from "react-router-dom";

import { useState, useEffect } from "react";
import axios from "axios";

const ExamForm = () => {
  const location = useLocation();
  const selectedQuestionIds = location.state?.selectedQuestions || []; // Expecting an array of IDs
  const [filterquestions, setFilterQuestions] = useState([]);
  console.log(filterquestions);

  useEffect(() => {
    if (selectedQuestionIds.length) {
      fetchQuestions();
    }
  }, [selectedQuestionIds]);

  const fetchQuestions = async () => {
    try {
      const ids = selectedQuestionIds.join(",");
      const response = await axios.get(
        `http://localhost:3000/api/add-questions/${ids}`
      );
      setFilterQuestions(response.data);
    } catch (error) {
      console.error("Failed to fetch questions", error);
    }
  };

  return (
    <div className="h-auto">
      <form
        className="absolute bg-slate-50  my-10 w-8/12 right-0 left-0 mx-auto rounded-xl"
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="text-center text-green-800 font-bold py-8 text-4xl">
          Exam Form
        </h1>

        <div className="mx-6 my-4">
          <div className="flex text-fuchsia-900">
            <p className="text-3xl font-semibold">Subject Name : </p>
            <input
              className="p-2 mx-2 rounded-md border border-cyan-950 w-4/12 outline-none"
              type="text"
              placeholder="Name"
            />
          </div>

          <div className="flex justify-start space-x-8 my-4">
            <span className="flex justify-start">
              <p className="text-xl text-fuchsia-900 font-semibold">Date : </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="date"
              />
            </span>

            <span className="flex justify-start">
              <p className="text-xl text-fuchsia-900 font-semibold">
                Academic Session :{" "}
              </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="text"
                placeholder="year"
              />
            </span>
          </div>

          <div className="flex justify-normal">
            <div className="flex">
              <p className="text-xl text-fuchsia-900 font-semibold">
                Duration :{" "}
              </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="text"
                placeholder="Minutes"
              />
            </div>

            <div className="flex mx-5">
              <p className="text-xl text-fuchsia-900 font-semibold">
                Full Marks :{" "}
              </p>
              <input
                className="mx-2 p-2 rounded-md border border-cyan-950  outline-none"
                type="number"
                placeholder="Marks"
              />
            </div>
          </div>
          <div className="my-6">
            {filterquestions.map((q, index) => {
              return (
              <ul className="font-semibold text-lg ">
                <li className="font-bold text-xl text-blue-800 my-3">
                  Q({index + 1}) {q.question}
                </li>
              </ul>
              )
            })}
          </div>
        </div>
      </form>
    </div>
  );
};

export default ExamForm;
