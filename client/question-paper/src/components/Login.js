import "../style/login.css";
import { useRef, useState } from "react";
import { LoginBodyImg } from "../utils/constant";
import axios from "axios";

const Login = () => {
  
  const [isSignInForm, setisSignInForm] = useState(true);
  //console.log(isSignInForm);
  

  const name = useRef()
  const email = useRef()
  const password = useRef()

  const handleButtonClick = async ()=>{
    // console.log(name.current.value);
    // console.log(email.current.value);
    // console.log(password.current.value);

    if(!isSignInForm){
      try {
        const response = await axios.post("/signup", {    //the url is on the pckj.json file "proxy"
          name: name?.current?.value,
          username: email?.current?.value,
          password: password?.current?.value,
        });
        console.log(response.data);
      } catch (error) {
        console.log("Error signing up");
      }
    }
    else {
      try {
        const response = await axios.post("/signin", {
          // name: name?.current.value,
          username: email?.current?.value,
          password: password?.current?.value,
        });
        //console.log(response.data);

        const token = response.data.token;
        //console.log('Response data:', response.data);
        localStorage.setItem("token", token); // Store the token in localStorage

        console.log("Signed in successfully");
        window.location.href = "http://localhost:3000/dashboard";
      } catch (error) {
        console.log("Error signing in");
        // showErrorMessage("Error signing in")
      }          
    }
    
  }

  const togglSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  return (
    <div className="login">

        <div className="login-background">
           <img src={LoginBodyImg} alt="img" />
        </div>

      <form
        className="form"
        onSubmit={(e) => {
          return e.preventDefault();
        }}
      >
        <h1>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (

        <input 
        ref={name}  
         type="name" placeholder="Name" />
        )}
        <br />
        
        <input
        ref={email}
         type="email" placeholder="Email" />
        <br />

        <input
        ref={password}
         type="password" placeholder="Password" />
        <br />

        <button onClick={handleButtonClick}>
          {isSignInForm? "Sign In" : "Sign Up"}</button>

        <p onClick={togglSignInForm}>
          {isSignInForm
            ? "Not have account?  Sign Up"
            : "Already registered? Sign In "}
        </p>
      </form>
    </div>
  );
};

export default Login;
