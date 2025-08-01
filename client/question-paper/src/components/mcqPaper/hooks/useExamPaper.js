import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const useExamPaper = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const { exam_id } = useParams();
  //console.log(exam_id);

  const [paper, setPaper] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  // console.log(selectedAnswers);

  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState({}); // State to hold feedback for each question
  const [isSubmitted, setIsSubmitted] = useState(false); // State to track exam submission

  useEffect(() => {
    fetchExamDetails();
  }, []);

  const fetchExamDetails = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/exam/${exam_id}`);
      setPaper(response.data);
      // You can now display the exam details and questions with their options
    } catch (error) {
      console.error("Error fetching exam paper:", error.response.data);
    }
  };

  const handleAnswerChange = (questionIndex, selectedOption) => {
   

    setSelectedAnswers((prev) => {
     
      const currentAnswers = prev[questionIndex] || [];
      //first time current ans is empty

      const questionDetails =
        paper?.Questions[questionIndex]?.questions_details;

      const category = questionDetails?.category; // Safely get the category

      if (!category) {
        return prev;
      }

      if (category === "true/false" || category === "select one") {
        return {
          ...prev,
          [questionIndex]: [selectedOption], // Only one selection allowed
        };
      } else if (category === "select two") {
        if (currentAnswers.includes(selectedOption)) {
          //This logic toggles the selected option: removes it if already selected.
          return {
            ...prev,
            [questionIndex]: currentAnswers.filter(
              (answer) => answer !== selectedOption
            ),
          };
        } else {
          //adds it if not present,
          return {
            ...prev,
            [questionIndex]: [...currentAnswers, selectedOption],
          };
        }
      }
      return prev;
    });
  };

  useEffect(() => {
    if (score !== 0) {
    }
  }, [score]);

  const handleSubmit = () => {
    const totalScore = paper?.Questions?.reduce((acc, question, index) => {
      //console.log(index);
      
      const selectedAnswer = selectedAnswers[index] || [];
      // console.log(selectedAnswer);
      
      // Select true/false category
      if (question?.questions_details?.category === "true/false") {

        const correctOption = question.questions_details.answereOptions.find(
          (option) => option.isCorrect
        );

        const correctText = correctOption?.text || "";

        const isCorrect = selectedAnswer.includes(correctText);

        setFeedback((prev) => ({
          ...prev,
          [index]: selectedAnswer.length > 0 ? isCorrect : "noSelection",
        }));

        return acc + (isCorrect ? question?.questions_details?.marks : 0);
      }

      // Select One category
      if (question?.questions_details?.category === "select one") {
        // Use find to get the first correct option
        const correctOption = question.questions_details.answereOptions.find(
          (option) => option.isCorrect
        );

        const isCorrect = correctOption
          ? selectedAnswer.includes(correctOption.text)
          : false;

        setFeedback((prev) => ({
          ...prev,
          [index]: selectedAnswer.length > 0 ? isCorrect : "noSelection",
        }));

        return acc + (isCorrect ? question?.questions_details?.marks : 0);
      }
      // Select One category
      if (question?.questions_details?.category === "select two") {
        const correctOptions = question.questions_details.answereOptions
          .filter((option) => option.isCorrect)
          .map((option) => option.text);

        const isCorrect =
          selectedAnswer.length === correctOptions.length &&
          correctOptions.every((option) => selectedAnswer.includes(option));

        setFeedback((prev) => ({
          ...prev,
          [index]: selectedAnswer.length > 0 ? isCorrect : "noSelection",
        }));

        return acc + (isCorrect ? question?.questions_details?.marks : 0);
      }

      return acc;
    }, 0);

    setScore(totalScore);
    setIsSubmitted(true);
  };

  return {
    exam_id,
    paper,
    selectedAnswers,
    score,
    feedback,
    isSubmitted,
    fetchExamDetails,
    handleAnswerChange,
    handleSubmit,
  };
};
export default useExamPaper;
