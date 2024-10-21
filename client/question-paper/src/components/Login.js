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
    <div className="">

        <div className="absolute w-full">
           <img className="object-cover w-full h-[800px]" src={LoginBodyImg} alt="img" />
        </div>

      <form
        className="absolute  bg-slate-500 p-12 w-3/12 my-32 mx-auto  right-0 left-0 text-white rounded-lg bg-opacity-80"
        onSubmit={(e) => {
          return e.preventDefault();
        }}
      >
        <h1 className="font-bold my-2 text-2xl">{isSignInForm ? "Sign In" : "Sign Up"}</h1>

        {!isSignInForm && (

        <input className="w-full outline-none text-black p-2 my-1 rounded-md"
        ref={name}  
         type="name" placeholder="Name" />
        )}
        <br />
        
        <input className="w-full outline-none text-black p-2 my-1 rounded-md"
        ref={email}
         type="email" placeholder="Email" />
        <br />

        <input className="w-full outline-none text-black p-2 my-1 rounded-md"
        ref={password}
         type="password" placeholder="Password" />
        <br />

        <button className="w-full p-2 my-1 rounded-md bg-slate-900 text-slate-100"
        onClick={handleButtonClick}>
          {isSignInForm? "Sign In" : "Sign Up"}</button>

        <p className="my-2" 
        onClick={togglSignInForm} >
          {isSignInForm
            ? "Not have account?  Sign Up"
            : "Already registered? Sign In "}
        </p>
      </form>
    </div>
  );
};

export default Login;
