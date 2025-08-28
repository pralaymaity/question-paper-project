import axios from "axios";
import { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";

import {clearAllQuestions} from "../../../utils/selectQuestionSlice"
import { useDispatch } from "react-redux";


const useGeneratePaper = () => {

  const apiUrl = process.env.REACT_APP_API_URL;

  const [questions, setQuestions] = useState([]);
  //console.log(questions);

  const pdfRef = useRef();

  const [formData, setFormData] = useState({
    collegeName: "",
    academicSession: "",
    date: "",
    timeAllotted: "",
    paperName: "",
    paperCode: "",
    totalMarks: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api-clg/get-paper`);

      let jsonData = res?.data?.paper;
      setQuestions(jsonData);
    } catch (err) {
      console.log("data failed to load", err);
    }
  };

  const resetData = async () => {
    try {
      const res = await axios.post(`${apiUrl}/api-clg/reset-paper`);

      setQuestions(res.data);
      dispatch(clearAllQuestions())
      console.log("paper reset");

    } catch (err) {
      console.log("data failed to reset", err);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleGeneratePDF = async (e) => {
    e.preventDefault();
    const clone = pdfRef.current.cloneNode(true);

    // 2. Convert input fields to plain text
    clone.querySelectorAll("input, textarea, select").forEach((el) => {
      const text = document.createElement("span");
      text.textContent = el.value;
      el.parentNode.replaceChild(text, el);
    });

    // 3. Generate PDF from transformed clone
    const opt = {
      margin: 0,
      filename: "question-paper.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"] },
    };

    html2pdf().set(opt).from(clone).save().then(() => {
        resetData();
    });
    //.save() in html2pdf() returns a Promise, which is why using .then() is valid.
                      
  };

  return {
    questions,
    pdfRef,
    formData,
    fetchData,
    resetData,
    handleChange,
    handleGeneratePDF,
  };
};

export default useGeneratePaper;
