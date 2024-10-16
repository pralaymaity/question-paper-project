import React from "react";
import QuestionForm from "./QuestionForm";
import { useEffect } from "react";

const Dashboard = () => {
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      // No token found, redirect to login page
      window.location.href = "http://localhost:3000/";
    }
  }, []);

  return (
    <div>
      <QuestionForm />
    </div>
  );
};

export default Dashboard;
