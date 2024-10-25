import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExamPaper = () => {
  const { exam_id } = useParams(); // Extract exam_id from the URL
  console.log(exam_id);

  const [paper, setPaper] = useState([]);
  console.log(paper);

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(`/api/exam/${exam_id}`);
      setPaper(response.data);
      // You can now display the exam details and questions with their options
    } catch (error) {
      console.error("Error fetching exam paper:", error.response.data);
    }
  };

  const { subject, academic_session, duration, fullmarks, exam_date } = paper;
  
  const formattedDate = exam_date
    ? new Date(exam_date).toISOString().split("T")[0]
    : "Invalid Date"; // invalid if exam_date is not valid

  return (
    <div className="bg-zinc-100 h-auto py-6">
      <div className="flex justify-between">

        <p className="mx-4 text-2xl font-bold text-blue-700">
          Subject : {subject}
        </p>

        <p className="text-2xl font-bold text-blue-700">
          Academic Session : {academic_session}{" "}
        </p>

        <p className="text-2xl font-bold text-blue-700">
          Duration : {duration}
        </p>

        <p className="text-2xl font-bold text-blue-700">
          FullMarks : {fullmarks}
        </p>

        <p className="mx-4 text-2xl font-bold text-blue-700">
          Date : {formattedDate}
        </p>

      </div>

      <div className="py-4 px-10">
        {paper?.Questions?.map((data, index) => {
          const { question, questions_details } = data;
          const { category, answereOptions } = questions_details;

          return (
            <ul key={index} className="py-3">
              <li className="font-semibold text-2xl text-fuchsia-800">
                Q({index + 1}) {question}
              </li>

              {category === "true/false" && (
                <div className="py-2 px-6">
                  {["True", "False"].map((option, idx) => (
                    <div key={idx} className="flex justify-start py-2">
                      <input                   
                        type="radio"
                        name={`question-${index}`}
                        value={option}
                        className="w-6 h-6 text-blue-600 form-radio"
                      />
                      <span className="mx-2 text-xl text-teal-800 font-semibold">{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {category === "select one" && (
                <div className="py-2 px-6">
                  {answereOptions.map((option, idx) => (
                    <div key={idx} className="flex justify-start py-2">
                      <input
                        type="radio"
                        name={`question-${index}`}
                        value={option.text}
                        className="w-6 h-6 text-blue-600 form-radio"
                      />
                      <span className="mx-2 text-xl text-teal-800 font-semibold">{option.text}</span>
                    </div>
                  ))}
                </div>
              )}

              {category === "select two" && (
                <div className="py-2 px-6">
                  {answereOptions.map((option, idx) => (
                    <div key={idx} className="flex justify-start py-2">
                      <input
                        type="checkbox"
                        name={`question-${index}`}
                        value={option.text}
                        className="w-6 h-6 text-blue-600 form-checkbox"
                      />
                      <span className="mx-2 text-xl text-teal-800 font-semibold">{option.text}</span>
                    </div>
                  ))}
                </div>
              )}
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default ExamPaper;
