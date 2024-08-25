import { useSelector } from "react-redux";


const QuestionList = () => {

   const questionList = useSelector((store)=>{    // step2 catch the data and give to question list
    return store.questions.list
   })
    
  //  const {questionText , category} = questionList || {}; // Destructure with a fallback to an empty object
    
  return (
    
    <div>
        <h1>List of Questions</h1>

       {questionList.map((question, index) => {

      return (
          <ul key={index}>
            <li>{question.questionText}</li>
            <li>{question.category}</li>
          </ul>      
      );
      
    })} 

    
    </div>
  )
}

export default QuestionList