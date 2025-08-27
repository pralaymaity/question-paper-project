import { useEffect, useState } from "react";
import useExamPaper from "./hooks/useExamPaper";
import TimerDisplay from "./TimerDisplay";

const ExamPaper = () => {
  const {
    paper,
    selectedAnswers,
    score,
    feedback,
    isSubmitted,
    fetchExamDetails,
    handleAnswerChange,
    handleSubmit,
  } = useExamPaper();

  //for one time print the paper
  useEffect(() => {
    console.log("Paper fetched:", paper);
  }, [paper]);

  const { subject, academic_session, duration, fullmarks, exam_date } = paper;

  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    if (paper && duration && !isSubmitted) {
      setTimeLeft(duration * 60); // convert minutes to seconds
    }
  }, [paper, duration, isSubmitted]);

  useEffect(() => {
    if (timeLeft === null || isSubmitted) return;

    if (timeLeft === 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, isSubmitted, handleSubmit]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const formattedDate = exam_date
    ? new Date(exam_date).toISOString().split("T")[0]
    : "Invalid Date";

  return (
    <div className="bg-zinc-100 min-h-screen py-6 px-4 sm:px-8">
      {/* Exam Header */}
      <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-blue-700 text-base sm:text-xl font-semibold">
        <p>📘 Subject: {subject}</p>
        <p>📅 Date: {formattedDate}</p>
        <p>🎓 Session: {academic_session}</p>
        <p>⏱️ Duration: {duration} mins</p>
        <p>📝 Full Marks: {fullmarks}</p>
      </div>

      {/* Timer */}
      {timeLeft !== null && !isSubmitted && (
        <TimerDisplay timeLeft={timeLeft} />
      )}

      {/* Scoreboard */}
      <div className="text-center mb-8">
        <p className="text-2xl sm:text-4xl font-bold text-orange-600">
          🎯 Scoreboard: {score}
        </p>
      </div>

      {/* Questions */}
      <div className="py-4 px-2 sm:px-6">
        {paper?.Questions?.map((data, index) => {
          const { question, questions_details } = data;
          const { category, answereOptions } = questions_details;

          const correctAnswer = answereOptions.find(
            (option) => option.isCorrect
          );

          return (
            <ul key={index} className="py-3">
              <li className="font-semibold text-lg sm:text-2xl text-fuchsia-800 flex justify-between flex-wrap gap-2">
                <span>
                  Q({index + 1}) {question}
                </span>
                <span className="text-right">{questions_details.marks}</span>
              </li>

              {/* True/False */}
              {category === "true/false" && (
                <div className="py-2 space-y-2">
                  {["True", "False"].map((option, idx) => {
                    const isSelected =
                      selectedAnswers[index]?.includes(option) || false;

                    const correctText = correctAnswer
                      ? correctAnswer.text
                      : null;
                    const isCorrectAnswer = option === correctText;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center py-2 px-3 rounded w-full sm:w-6/12 md:w-4/12 ${
                          isSubmitted && isSelected && isCorrectAnswer
                            ? "bg-green-500"
                            : isSubmitted && isSelected && !isCorrectAnswer
                            ? "bg-red-500"
                            : isSubmitted &&
                              !isSelected &&
                              isCorrectAnswer &&
                              "bg-blue-500"
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          value={option}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(index, option)}
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="ml-2 text-base sm:text-xl font-semibold text-teal-800">
                          {option}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Select One / Select Two */}
              {(category === "select one" || category === "select two") && (
                <div className="py-2 space-y-2">
                  {answereOptions.map((option, idx) => {
                    const isSelected =
                      selectedAnswers[index]?.includes(option.text) || false;

                    const isCorrectAnswer = option.isCorrect;

                    return (
                      <div
                        key={idx}
                        className={`flex items-center py-2 px-3 rounded w-full sm:w-8/12 md:w-6/12 ${
                          isSubmitted && isSelected && isCorrectAnswer
                            ? "bg-green-500"
                            : isSubmitted && isSelected && !isCorrectAnswer
                            ? "bg-red-500"
                            : isSubmitted &&
                              isCorrectAnswer &&
                              !isSelected &&
                              feedback[index] !== undefined &&
                              "bg-blue-500"
                        }`}
                      >
                        <input
                          type={
                            category === "select one" ? "radio" : "checkbox"
                          }
                          name={`question-${index}`}
                          value={option.text}
                          checked={isSelected}
                          onChange={() =>
                            handleAnswerChange(index, option.text)
                          }
                          className="w-5 h-5 text-blue-600"
                        />
                        <span className="ml-2 text-base sm:text-xl font-semibold text-teal-800">
                          {option.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </ul>
          );
        })}
      </div>

      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          onClick={handleSubmit}
          className="my-4 w-full sm:w-auto px-6 py-2 bg-blue-500 text-white text-lg rounded"
        >
          Submit Paper
        </button>
      </div>
    </div>
  );
};

export default ExamPaper;
