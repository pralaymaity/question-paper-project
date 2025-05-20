import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { lazy } from "react";

import Layout from "./Layout";
import PrivateRoute from "./PrivateRoute";

const Body = () => {
  const Login = lazy(() => import("./Login"));
  const Dashboard = lazy(() => import("./Dashboard"));
  //mcq route
  const QuestionList = lazy(() => import("./QuestionList"));
  const QuestionStorage = lazy(() => import("./mcqPaper/QuestionStorage"));
  const ExamForm = lazy(() => import("./mcqPaper/ExamForm"));
  const ExamPaper = lazy(() => import("./mcqPaper/ExamPaper"));
  const QuestionForm = lazy(() => import("./mcqPaper/QuestionForm"));
  const GeneratePaper = lazy(() => import("./collegePaper/GeneratePaper"));

  //college route
  const CollegeQuestionForm = lazy(() =>
    import("./collegePaper/CollegeQuestionForm")
  );
  const StoreQuestions = lazy(() => import("./collegePaper/StoreQuestions"));

  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense>
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "dashboard",
          element: (
            <PrivateRoute>
              <Suspense>
                <Dashboard />
              </Suspense>
            </PrivateRoute>
          ),
        },
        //MCQ route
        {
          path: "dashboard/questionform",
          element: (
            <PrivateRoute>
              <Suspense>
                <QuestionForm />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "dashboard/questionform/questionlist",
          element: (
            <PrivateRoute>
              <Suspense>
                <QuestionList />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "dashboard/question-storage",
          element: (
            <PrivateRoute>
              <Suspense>
                <QuestionStorage />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "dashboard/exam-form",
          element: (
            <PrivateRoute>
              <Suspense>
                <ExamForm />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "dashboard/exam-paper/:exam_id",
          element: (
            <PrivateRoute>
              <Suspense>
                <ExamPaper />
              </Suspense>
            </PrivateRoute>
          ),
        },
        //Collge Route
        {
          path: "dashboard/college-question-form",
          element: (
            <PrivateRoute>
              <Suspense>
                <CollegeQuestionForm />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "dashboard/store-question",
          element: (
            <PrivateRoute>
              <Suspense>
                <StoreQuestions />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "dashboard/college-question-form/questionlist",
          element: (
            <PrivateRoute>
              <Suspense>
                <QuestionList />
              </Suspense>
            </PrivateRoute>
          ),
        },
        {
          path: "dashboard/generate-paper",
          element: (
            <PrivateRoute>
              <Suspense>
                <GeneratePaper />
              </Suspense>
            </PrivateRoute>
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
