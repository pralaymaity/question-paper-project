import { useState } from "react";
import QuestionForm from "./mcqPaper/QuestionForm";
import CollegeQuestionForm from "./collegePaper/CollegeQuestionForm";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="min-h-[70vh] p-4 bg-gray-100">
      <h1 className="text-4xl text-center font-bold mb-6">Dashboard</h1>

      {!selectedForm ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 ">
          <div
            className="cursor-pointer p-6 h-36 bg-white rounded-xl shadow hover:bg-blue-100 text-center"
            onClick={() => {
              setSelectedForm("mcq");
              navigate("/dashboard/questionform");
            }}
          >
            <h2 className="text-2xl font-semibold mt-6">MCQ Form</h2>
          </div>

          <div
            className="cursor-pointer p-6 bg-white rounded-xl shadow hover:bg-green-100 text-center"
            onClick={() => {
              setSelectedForm("college");
              navigate("/dashboard/college-question-form");
            }}
          >
            <h2 className="text-2xl font-semibold mt-6">
              College Question Form
            </h2>
          </div>
        </div>
      ) : (
        <div className="mt-6">
          {selectedForm === "mcq" && <QuestionForm />}
          {selectedForm === "college" && <CollegeQuestionForm />}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
