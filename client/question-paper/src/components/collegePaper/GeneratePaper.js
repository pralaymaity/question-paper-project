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
    <div className="bg-slate-50 py-4 px-6">
      <div ref={pdfRef} className="bg-white p-4 rounded shadow-md">
        <div className="">
          <img className="h-20 w-40 mx-auto" src={RCC_LOGO} alt="" />
        </div>

        <PaperForm handleChange={handleChange}/>

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
