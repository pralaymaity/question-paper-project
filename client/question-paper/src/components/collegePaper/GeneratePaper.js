import { RCC_LOGO } from "../../utils/constant";
import "../../index.css";
import useGeneratePaper from "./hooks/useGeneratePaper";
import PaperForm from "./PaperForm";

const GeneratePpaer = () => {
  const {
    questions,
    pdfRef,
    formData,
    fetchData,
    resetData,
    handleChange,
    handleGeneratePDF,
  } = useGeneratePaper();

  return (
    <div className="bg-slate-50 py-4 px-3 sm:px-6">
      <div ref={pdfRef} className="bg-white p-4 rounded shadow-md">
        {/* Logo */}
        <div className="mb-4">
          <img
            className="h-16 sm:h-20 w-32 sm:w-40 mx-auto"
            src={RCC_LOGO}
            alt="RCC Logo"
          />
        </div>

        {/* Form Section */}
        <PaperForm handleChange={handleChange} />

        {/* ================= Group A ================= */}
        <div className="m-3 sm:m-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          {Array.isArray(questions?.GroupA) && questions.GroupA.length > 0 ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="text-center sm:text-left">
                  <h2 className="font-bold text-lg sm:text-2xl">Group A</h2>
                  <h3 className="font-medium text-sm sm:text-base text-gray-600">
                    (Answer any ten questions)
                  </h3>
                </div>
                <div className="font-bold text-sm sm:text-xl mt-2 sm:mt-0 text-black-700">
                  [1 × 10 = 10]
                </div>
              </div>
              <ul className="space-y-2">
                {questions.GroupA.map((ques, idx) => (
                  <li
                    key={ques.id}
                    className="pl-2 text-sm sm:text-base leading-relaxed"
                  >
                    {idx + 1}. {ques.question}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No questions in Group A</p>
          )}
        </div>

        {/* ================= Group B ================= */}
        <div className="m-3 sm:m-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          {Array.isArray(questions?.GroupB) && questions.GroupB.length > 0 ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="text-center sm:text-left">
                  <h2 className="font-bold text-lg sm:text-2xl">Group B</h2>
                  <h3 className="font-medium text-sm sm:text-base text-gray-600">
                    (Answer any three questions)
                  </h3>
                </div>
                <div className="font-bold text-sm sm:text-xl mt-2 sm:mt-0 text-black-700">
                  [5 × 3 = 15]
                </div>
              </div>
              <ul className="space-y-3">
                {questions.GroupB.map((ques, idx) => (
                  <li key={ques.id} className="text-sm sm:text-base">
                    <div className="flex flex-col gap-1">
                      {ques.question?.split("\n").map((line, i) => (
                        <div key={i} className="flex justify-between">
                          <div>{i === 0 ? `${idx + 2}. ${line}` : line}</div>
                          <div className="ml-4 text-teal-700 font-semibold">
                            {ques.sub_question_marks?.[i]?.marks}
                          </div>
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

        {/* Page Break */}
        <div style={{ pageBreakBefore: "always" }}></div>

        {/* ================= Group C ================= */}
        <div className="m-3 sm:m-6 p-4 border rounded-lg shadow-sm bg-gray-50">
          {Array.isArray(questions?.GroupC) && questions.GroupC.length > 0 ? (
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
                <div className="text-center sm:text-left">
                  <h2 className="font-bold text-lg sm:text-2xl">Group C</h2>
                  <h3 className="font-medium text-sm sm:text-base text-gray-600">
                    (Answer any three questions)
                  </h3>
                </div>
                <div className="font-bold text-sm sm:text-xl mt-2 sm:mt-0 text-black-700">
                  [15 × 3 = 45]
                </div>
              </div>
              <ul className="space-y-3">
                {questions.GroupC.map((ques, idx) => (
                  <li key={ques.id} className="text-sm sm:text-base">
                    {idx + 7}.
                    <div className="flex flex-col sm:flex-row justify-between mt-1">
                      <div className="mr-4">
                        {ques.question?.split("\n").map((line, i) => (
                          <div key={i}>{line}</div>
                        ))}
                      </div>
                      <div className="text-teal-700 font-semibold">
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

        {/* End of Paper */}
        <div className="text-center font-semibold mt-8 text-gray-700">
          *** END OF PAPER ***
        </div>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:gap-0 sm:justify-between">
        <button
          onClick={handleGeneratePDF}
          className="bg-white text-base sm:text-lg text-teal-950 border border-teal-950 font-semibold px-4 py-2 rounded-md hover:bg-teal-950 hover:text-white"
        >
          Download as PDF
        </button>
        <button
          className="p-3 w-full sm:w-36 cursor-pointer bg-white border border-teal-950 rounded-md text-teal-950 font-semibold text-base sm:text-lg hover:bg-teal-950 hover:text-white"
          onClick={resetData}
        >
          Reset Paper
        </button>
      </div>
    </div>
  );
};

export default GeneratePpaer;
