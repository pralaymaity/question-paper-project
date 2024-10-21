import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../style/body.css";
import { Suspense } from "react";
import { lazy } from "react";

import Layout from "./Layout";

const Body = () => {
  const Login = lazy(() => import("./Login"));
  const Dashboard = lazy(() => import("./Dashboard"));
  const QuestionList = lazy(() => import("./QuestionList"));
  const QuestionStorage = lazy(() => import("./QuestionStorage"));
  const ExamForm = lazy(() => import("./ExamForm"));

  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: (
            <Suspense>
              <Login />
            </Suspense>
          ),
        },
        {
          path: "/dashboard",
          element: (
            <Suspense>
              <Dashboard />
            </Suspense>
          ),
        },
        {
          path: "/questionlist",
          element: (
            <Suspense>
              <QuestionList />
            </Suspense>
          ),
        },
        {
          path: "/question-storage",
          element: (
            <Suspense>
              <QuestionStorage />
            </Suspense>
          ),
        },
        {
          path: "/exam-form",
          element: (
            <Suspense>
              <ExamForm />
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
