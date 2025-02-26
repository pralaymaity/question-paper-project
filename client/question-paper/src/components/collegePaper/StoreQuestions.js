import axios from "axios";
import React, { useEffect, useState } from "react";

const StoreQuestions = () => {
  const [originalData, setOriginalData] = useState([]);
  console.log(originalData);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/take-question",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Send the token in the Bearer format
          },
        }
      );

      let jsonData = response.data;
      setOriginalData(jsonData);
    } catch (err) {}
  };

  return <div>StoreQuestions</div>;
};

export default StoreQuestions;
