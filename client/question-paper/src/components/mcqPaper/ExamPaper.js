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
  useEffect(()=>{
    console.log("Paper fetched:", paper);
  },[paper])
  

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

  const formattedDate = exam_date ? new Date(exam_date).toISOString().split("T")[0] : "Invalid Date";
    
    

  return (
    <div className="bg-zinc-100 min-h-screen py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-wrap justify-between text-blue-700 text-xl font-semibold">
        <p>📘 Subject: {subject}</p>
        <p>📅 Date: {formattedDate}</p>
        <p>🎓 Academic Session: {academic_session}</p>
        <p>⏱️ Duration: {duration} mins</p>
        <p>📝 Full Marks: {fullmarks}</p>
      </div>

      {timeLeft !== null && !isSubmitted && <TimerDisplay timeLeft={timeLeft} />}

      <div className="text-center mb-10">
        <p className="text-4xl font-bold text-orange-600">
          🎯 Scoreboard: {score}
        </p>
      </div>

      <div className="py-4 px-10">
        {paper?.Questions?.map((data, index) => {
          // console.log(index);
          
          const { question, questions_details } = data;
          const { category, answereOptions } = questions_details;

          const correctAnswer = answereOptions.find(
            (option) => option.isCorrect
          );

          return (
            <ul key={index} className="py-3">
              <li className="font-semibold text-2xl text-fuchsia-800 flex justify-between">
                <span>
                  Q({index + 1}) {question}
                </span>
                <span>{questions_details.marks}</span>
              </li>

              {category === "true/false" && (
                <div className="py-2 px-6">
                  {["True", "False"].map((option, idx) => {

                    const isSelected = selectedAnswers[index]?.includes(option) || false;
                    //What the user chose
                                                         
                    const correctText = correctAnswer ? correctAnswer.text : null;
                                            
                    const isCorrectAnswer = option === correctText;
                    //What the system says is correct

                    return (
                      <div
                        key={idx}
                        className={`flex justify-start py-2 ${
                          isSubmitted && isSelected && isCorrectAnswer
                            ? "bg-green-500 rounded w-2/12"
                            : isSubmitted && isSelected && !isCorrectAnswer
                            ? "bg-red-500 rounded w-2/12"
                            : isSubmitted && !isSelected && isCorrectAnswer
                            ? "bg-blue-500 rounded w-2/12"
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
                          // All radio buttons would be treated as independent if not name include
                          value={option}
                          checked={isSelected}
                          onChange={() => handleAnswerChange(index, option)}
                          className="w-6 h-6 text-blue-600 form-radio"
                        />
                        <span className="mx-2 text-xl font-semibold text-teal-800">
                          {option}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              {(category === "select one" || category === "select two") && (
                <div className="py-2 px-6">
                  {answereOptions.map((option, idx) => {

                    const isSelected = selectedAnswers[index]?.includes(option.text) || false;
                      
                    const isCorrectAnswer = option.isCorrect;

                    return (
                      <div
                        key={idx}
                        className={`flex justify-start py-2 ${
                          isSubmitted && isSelected && isCorrectAnswer
                            ? "bg-green-500 rounded w-2/12"
                            : isSubmitted && isSelected && !isCorrectAnswer
                            ? "bg-red-500 rounded w-2/12"
                            : isSubmitted && isCorrectAnswer && !isSelected && feedback[index] !== undefined
                                                                                          
                            ? "bg-blue-500 rounded w-2/12"
                            : ""
                        }`}
                      >
                        <input
                          type={
                            category === "select one" ? "radio" : "checkbox"
                          }
                          name={`question-${index}`}
                          value={option.text}
                          onChange={() =>
                            handleAnswerChange(index, option.text)
                          }
                          className="w-6 h-6 text-blue-600 form-checkbox"
                        />
                        <span className="mx-2 text-xl font-semibold text-teal-800">
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

      <button
        onClick={handleSubmit}
        className="my-4 mx-10 p-2 bg-blue-500 text-white rounded"
      >
        Submit Paper
      </button>
    </div>
  );
};

export default ExamPaper;
