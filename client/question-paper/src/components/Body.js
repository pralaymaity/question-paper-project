import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import '../style/body.css';
import { Suspense } from 'react';
import { lazy } from 'react';
import QuestionList from './QuestionList';



const Body = () => {

  const Login = lazy(()=>import("./Login"));
  const Dashboard = lazy(()=>import("./Dashboard"));

  const appRoute = createBrowserRouter([
    {
      path:"/",
      element:<Suspense> <Login /> </Suspense> 
    },
    {
      path:"/dashboard",
      element: <Suspense> <Dashboard /> </Suspense>
    },
    {
      path:"/questionlist",
      element: <QuestionList /> 
    }
  ])

  return (

    <div className='body'>

        <RouterProvider router = {appRoute} />

    </div>
   
   
  )
}

export default Body
