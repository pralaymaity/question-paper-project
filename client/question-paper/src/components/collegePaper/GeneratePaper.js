import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import html2pdf from "html2pdf.js";
import { RCC_LOGO } from "../../utils/constant";
import "../../index.css"

const GeneratePpaer = () => {
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

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/get-paper");

      let jsonData = res?.data?.paper;
      setQuestions(jsonData);
    } catch (err) {
      console.log("data failed to load", err);
    }
  };

  const resetData = async () => {
    try {
      const res = await axios.post("http://localhost:3000/reset-paper");

      setQuestions(res.data);
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
      pagebreak: { mode: ['css', 'legacy'] }
    };

    html2pdf().set(opt).from(clone).save();
  };

  return (
    <div className="bg-slate-50 py-4 px-6">
      <div ref={pdfRef} className="bg-white p-4 rounded shadow-md">

         <div className="">
            <img className="h-20 w-40 mx-auto" src={RCC_LOGO} alt="" />
          </div>

        <form className="grid grid-cols-2 gap-2 ml-4">

          <div className="flex items-center gap-2  col-span-3">
            <label className="w-30 font-semibold">College Name:</label>
            <input
              className="border p-2 rounded flex-1 "
              name="collegeName"
              type="text"
              placeholder="Enter College Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Academic Session:</label>
            <input
              className="border p-2 rounded flex-1"
              name="academicSession"
              type="text"
              placeholder="Enter Academic Session"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Date:</label>
            <input
              className="border p-2 rounded flex-1"
              name="date"
              type="date"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Time Allotted:</label>
            <input
              className="border p-2 rounded flex-1"
              name="timeAllotted"
              type="text"
              placeholder="Enter Time"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Paper Name:</label>
            <input
              className="border p-2 rounded flex-1"
              name="paperName"
              type="text"
              placeholder="Enter Paper Name"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Paper Code:</label>
            <input
              className="border p-2 rounded flex-1"
              name="paperCode"
              type="text"
              placeholder="Enter Paper Code"
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="w-30 font-semibold">Total Marks:</label>
            <input
              className="border p-2 rounded flex-1"
              name="totalMarks"
              type="text"
              placeholder="Enter Total Marks"
              onChange={handleChange}
              required
            />
          </div>
        </form>

        

        {/*Group A */}
        <div className="m-4 p-3">
          {Array.isArray(questions?.GroupA) && questions.GroupA.length > 0 ? (
            <div>
              <div className="relative">
                <h2 className="font-bold text-2xl text-center">Group A</h2>
                <h3 className="font-semibold text-center">
                  (Answer any ten questions)
                </h3>
                <h2 className="absolute right-0 top-0 font-bold text-2xl">
                  [1 * 10 = 10]
                </h2>
              </div>

              <ul>
                {questions.GroupA.map((ques, idx) => (
                  <li key={ques.id} className="my-2 pl-3">
                    {idx + 1}. {ques.question}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No questions in Group A</p>
          )}
        </div>
        
        {/*Group B */}
        <div className="m-4 p-3">
          {Array.isArray(questions?.GroupB) && questions.GroupB.length > 0 ? (
            <div>
              <div className="relative">
                <h2 className="text-center font-bold text-2xl">Group B</h2>
                <h3 className="text-center font-semibold">
                  (Answer any three questions)
                </h3>
                <h2 className="absolute right-0 top-0 font-bold text-2xl">
                  [5 * 3 = 15]
                </h2>
              </div>

              <ul>
                {questions.GroupB.map((ques, idx) => (
                  <li key={ques.id} className="my-2 pl-3">
                    <div className="flex flex-col gap-1">
                      {ques.question?.split("\n").map((line, i) => (
                        <div key={i} className="flex justify-between">
                          <div>{i === 0 ? `${idx + 2}. ${line}` : line}</div>
                          <div>{ques.sub_question_marks?.[i]?.marks}</div>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No questions in Group B</p>
          )}
        </div>

        <div style={{ pageBreakBefore: "always" }}></div>
        {/* this will break the page into next page */}

        {/*Group C */}
        <div className="m-4 p-3">
          {Array.isArray(questions?.GroupC) && questions.GroupC.length > 0 ? (
            <div className="">
              <div className="relative ">
                <h2 className=" font-bold text-2xl text-center">Group C</h2>
                <h3 className="font-semibold text-center">
                  (Answer any three questions)
                </h3>
                <h2 className="absolute right-0 top-0 font-bold text-2xl">
                  [15 * 3 = 45]
                </h2>
              </div>

              <ul>
                {questions.GroupC.map((ques, idx) => (
                  <li key={ques.id} className="my-2 pl-3">
                    {idx + 7}.
                    <div className="flex justify-between">
                      <div className="mr-4">
                        {ques.question?.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                      <div>
                        {ques.sub_question_marks?.map((subMarks, index) => (
                          <div key={index}>{subMarks.marks}</div>
                        ))}
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No questions in Group C</p>
          )}
        </div>

        <div className="text-center font-semibold">*** END OF PAPER ***</div>
        
      </div>

      {/* Buttons below PDF content (not inside pdfRef) */}
      <div className="mt-6 flex justify-between">
        <button
          onClick={handleGeneratePDF}
          className="bg-white text-lg text-teal-950 border border-teal-950 font-semibold px-4 py-2 rounded-md hover:bg-teal-950 hover:text-white"
        >
          Download as PDF
        </button>
        <button
          className="p-3 w-36 cursor-pointer bg-white border border-teal-950 rounded-md text-teal-950 font-semibold text-lg hover:bg-teal-950 hover:text-white"
          onClick={resetData}
        >
          Reset Paper
        </button>
      </div>
    </div>
  );
};

export default GeneratePpaer;
