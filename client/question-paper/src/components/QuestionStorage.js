import axios from "axios";
import React, { useEffect, useState } from "react";

const QuestionStorage = () => {

    const [storageData , setstorageData] = useState([]);
    console.log(storageData);
    
    
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
        const token = localStorage.getItem('token'); // Ensure you have the token saved in localStorage or a similar place

        const questionStorage = await axios.get('http://localhost:3000/api/add-question', {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Bearer format
          },
        })

        const jsonData =  questionStorage.data
        setstorageData(jsonData)
        
    } 
    catch (error) {
      console.log("Error fetching questions", error);
    }
  };

  return (
    <div className="question-storage">
        
        { storageData.map((list , index)=>{

          let correctAns = null;;

            if (list.questions_details.category === 'true/false'){
              correctAns = list?.questions_details?.answereOptions[0]?.isCorrect ? "True" : "False"
            }
            else if(list.questions_details.category === 'select two'){

              correctAns = list?.questions_details?.answereOptions.filter((correct , idx)=>{
                return correct.isCorrect
              }).map((options , idx)=>{
                return options.text
              }).join(" , ")
            }
            else{
              correctAns = list.questions_details.answereOptions.find((option)=>{
                return option.isCorrect
              }).text                              
            }

                return (
                    <div className="list-question" key = {list.id}>
                        <ul>
                            <li>
                             Q({index + 1}) Questions:{list.question}
                            </li>
                            <li>
                              Subject: {list.Subject.subject_name}
                            </li>
                            <li>
                              Marks:{list.questions_details.marks}
                            </li>
                            <li>
                              Difficulty:{list.questions_details.category}
                            </li>

                            {list.questions_details.category === 'true/false' ? (
                              <li>
                                {/* Display True or False based on isCorrect */}
                                Correct Answer:{" "} {correctAns}
                              </li>
                              ) : (
                              <li >
                                {/* For other categories, display the correct answer text */}
                                Correct Answer:{" "}                                
                                  {correctAns || "No correct answer selected"}                                
                              </li>
                            )}
                            
                            <li>
                              Created By:{list.created_by}
                            </li>
                        </ul>
                        
                    </div>

                )
            })
           
        }

    </div>
  ) 
};

export default QuestionStorage;
