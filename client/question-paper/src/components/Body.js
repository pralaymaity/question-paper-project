import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../style/body.css";
import { Suspense } from "react";
import { lazy } from "react";

import Layout from "./Layout";



const Body = () => {
  const Login = lazy(() => import("./Login"));
  const Dashboard = lazy(() => import("./Dashboard"));
  //mcq route
  const QuestionList = lazy(() => import("./QuestionList"));
  const QuestionStorage = lazy(() => import("./QuestionStorage"));
  const ExamForm = lazy(() => import("./ExamForm"));
  const ExamPaper = lazy(() => import("./ExamPaper"));
  const QuestionForm = lazy(() => import("./QuestionForm"));
  const GeneratePaper = lazy(()=> import("./collegePaper/GeneratePaper"))

  //college route
  const CollegeQuestionForm = lazy(()=> import("./collegePaper/CollegeQuestionForm"));
  const StoreQuestions = lazy(()=> import("./collegePaper/StoreQuestions"));
  

  const appRoute = createBrowserRouter([

    {
      path: "/",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      )
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: (
            <Suspense>
              <Dashboard />
            </Suspense>
          ),
        },
        //MCQ route
        {
          path: "dashboard/questionform",
          element: (
            <Suspense>
              <QuestionForm />
            </Suspense>
          ),
        },
        {
          path: "dashboard/questionform/questionlist",
          element: (
            <Suspense>
              <QuestionList />
            </Suspense>
          ),
        },
        {
          path: "dashboard/question-storage",
          element: (
            <Suspense>
              <QuestionStorage />
            </Suspense>
          ),
        },
        {
          path: "dashboard/exam-form",
          element: (
            <Suspense>
              <ExamForm />
            </Suspense>
          ),
        },
        {
          path: "dashboard/exam-paper/:exam_id",
          element: (
            <Suspense>
              <ExamPaper />
            </Suspense>
          ),
        },
        //Collge Route
        {
          path: "dashboard/college-question-form",
          element: (
            <Suspense>
              <CollegeQuestionForm />
            </Suspense>
          ),
        },
        {
          path: "dashboard/store-question",
          element: (
            <Suspense>
              <StoreQuestions />
            </Suspense>
          ),
        },
        {
          path: "dashboard/college-question-form/questionlist",
          element: (
            <Suspense>
              <QuestionList />
            </Suspense>
          ),
        },
        {
          path: "dashboard/generate-paper",
          element: (
            <Suspense>
              <GeneratePaper />
            </Suspense>
          ),
        },


        
      ],
    },
  ]);

  return (
    <div className="body">
      <RouterProvider router={appRoute} />
    </div>
  );
};

export default Body;
