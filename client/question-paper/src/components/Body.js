import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "../style/body.css";
import { Suspense } from "react";
import { lazy } from "react";

import Layout from "./Layout";

const Body = () => {
  const Login = lazy(() => import("./Login"));
  const Dashboard = lazy(() => import("./Dashboard"));
  const QuestionList = lazy(() => import("./QuestionList"));

  const appRoute = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
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
