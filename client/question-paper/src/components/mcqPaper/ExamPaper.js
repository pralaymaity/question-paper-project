import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExamPaper = () => {
  const { exam_id } = useParams(); // Extract exam_id from the URL
  //console.log(exam_id);
  const [paper, setPaper] = useState([]);
  //console.log(paper);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  //console.log(selectedAnswers);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({}); // State to hold feedback for each question
  //console.log(feedback);
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track exam submission

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

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setSelectedAnswers((prev) => {
      const currentAnswers = prev[questionIndex] || [];

      const questionDetails =
        paper?.Questions[questionIndex]?.questions_details;
      const category = questionDetails?.category; // Safely get the category

      // If the category is not found, return the previous state
      if (!category) {
        return prev;
      }

      if (category === "true/false" || category === "select one") {
        // For true/false and single selection (select one), replace the current answer
        return {
          ...prev,
          [questionIndex]: [selectedOption], // Only one selection allowed
        };
      } else if (category === "select two") {
        // For multiple selections (checkbox), handle accordingly
        if (currentAnswers.includes(selectedOption)) {
          // If already selected, remove it
          return {
            ...prev,
            [questionIndex]: currentAnswers.filter(
              (answer) => answer !== selectedOption
            ),
          };
        } else {
          // Add to current answers
          return {
            ...prev,
            [questionIndex]: [...currentAnswers, selectedOption],
          };
        }
      }
      return prev; // Return unchanged if category doesn't match
    });
  };

  useEffect(() => {
    if (score !== 0) {
    }
  }, [score]);

  const handleSubmit = () => {
    const totalScore = paper?.Questions?.reduce((acc, question, index) => {
      const selectedAnswer = selectedAnswers[index] || []; // Default to empty array if no answer is selected

      // console.log("Question Index:", index);
      //console.log("Selected Answer:", selectedAnswer);
      // console.log("Current Question:", question);

      // True/False category
      if (question?.questions_details?.category === "true/false") {
        const correctOption = question.questions_details.answereOptions.find(
          (option) => option.isCorrect
        );
        //console.log("correct ans: ", correctOption);

        const isCorrect =
          (correctOption &&
            selectedAnswer.includes("True") &&
            correctOption.isCorrect) ||
          (correctOption &&
            selectedAnswer.includes("False") &&
            !correctOption.isCorrect);

        //console.log(isCorrect);
        setFeedback((prev) => ({
          ...prev,
          [index]: selectedAnswer.length > 0 ? isCorrect : "noSelection", // true or false based on correctness
        }));
        return acc + (isCorrect ? question?.questions_details?.marks : 0);
      }

      // Select One category
      if (question?.questions_details?.category === "select one") {
        // Use find to get the first correct option
        const correctOption = question.questions_details.answereOptions.find(
          (option) => option.isCorrect
        );

        // Use .includes() to check if the selectedAnswer contains the correct option text
        const isCorrect = correctOption
          ? selectedAnswer.includes(correctOption.text)
          : false;

        setFeedback((prev) => ({
          ...prev,
          [index]: selectedAnswer.length > 0 ? isCorrect : "noSelection", // true or false based on correctness
        }));

        return acc + (isCorrect ? question?.questions_details?.marks : 0);
      }

      if (question?.questions_details?.category === "select two") {
        const correctOptions = question.questions_details.answereOptions
          .filter((option) => option.isCorrect)
          .map((option) => option.text);

        const isCorrect =
          selectedAnswer.length === correctOptions.length &&
          correctOptions.every((option) => selectedAnswer.includes(option));
        //console.log(isCorrect);

        setFeedback((prev) => ({
          ...prev,
          [index]: selectedAnswer.length > 0 ? isCorrect : "noSelection", // true or false based on correctness
        }));

        return acc + (isCorrect ? question?.questions_details?.marks : 0);
      }

      return acc;
    }, 0);

    //console.log("Total Score:", totalScore); // Log totalScore only after reduce finishes
    setScore(totalScore);
    setIsSubmitted(true);
  };

  const { subject, academic_session, duration, fullmarks, exam_date } = paper;

  const formattedDate = exam_date
    ? new Date(exam_date).toISOString().split("T")[0]
    : "Invalid Date"; // invalid if exam_date is not valid

  return (
    <div className="bg-zinc-100 min-h-screen py-8 px-4">
      <div className="bg-white rounded-xl shadow-lg p-6 mb-8 flex flex-wrap justify-between text-blue-700 text-xl font-semibold">
        <p>📘 Subject: {subject}</p>
        <p>📅 Date: {formattedDate}</p>
        <p>🎓 Academic Session: {academic_session}</p>
        <p>⏱️ Duration: {duration} mins</p>
        <p>📝 Full Marks: {fullmarks}</p>
      </div>

      <div className="text-center mb-10">
        <p className="text-4xl font-bold text-orange-600">
          🎯 Scoreboard: {score}
        </p>
      </div>

      <div className="py-4 px-10">
        {paper?.Questions?.map((data, index) => {
          //console.log(data);

          const { question, questions_details } = data;
          const { category, answereOptions } = questions_details;

          // For True/False, we directly work with isCorrect
          const correctAnswer = answereOptions.find(
            (option) => option.isCorrect
          ); // Get the correct answer for true/false
          //const correctAnswers = answereOptions.filter(option => option.isCorrect).map(option => option.text);

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
                    const isSelected =
                      selectedAnswers[index]?.includes(option) || false; // Default to false if undefined
                    const isCorrectAnswer =
                      correctAnswer &&
                      correctAnswer.isCorrect === (option === "True");
                    // const isCorrectAnswer = correctAnswer.isCorrect === (option === "True");

                    return (
                      <div
                        key={idx}
                        className={`flex justify-start py-2 ${
                          isSubmitted && isSelected && isCorrectAnswer
                            ? "bg-green-500 rounded w-2/12" // Correct answer selected
                            : isSubmitted && isSelected && !isCorrectAnswer
                            ? "bg-red-500 rounded w-2/12" // Wrong answer selected
                            : isSubmitted &&
                              isCorrectAnswer &&
                              !isSelected &&
                              feedback[index] !== undefined
                            ? "bg-blue-500 rounded w-2/12" // Highlight correct answer if not selected
                            : ""
                        }`}
                      >
                        <input
                          type="radio"
                          name={`question-${index}`}
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

              {/* Handle Select One and Select Two categories */}
              {(category === "select one" || category === "select two") && (
                <div className="py-2 px-6">
                  {answereOptions.map((option, idx) => {
                    const isSelected =
                      selectedAnswers[index]?.includes(option.text) || false; // Default to false if undefined

                    const isCorrectAnswer = option.isCorrect; // Check if this option is the correct answer

                    return (
                      <div
                        key={idx}
                        className={`flex justify-start py-2 ${
                          isSubmitted && isSelected && isCorrectAnswer
                            ? "bg-green-500 rounded w-2/12" // Correct answer selected
                            : isSubmitted && isSelected && !isCorrectAnswer
                            ? "bg-red-500 rounded w-2/12" // Wrong answer selected
                            : isSubmitted &&
                              isCorrectAnswer &&
                              !isSelected &&
                              feedback[index] !== undefined
                            ? "bg-blue-500 rounded w-2/12" // Highlight correct answer if not selected
                            : ""
                        }`}
                      >
                        <input
                          type={
                            category === "select one" ? "radio" : "checkbox"
                          } // Use radio for "select one", checkbox for "select two"
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
