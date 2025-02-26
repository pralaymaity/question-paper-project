import "../style/login.css";
import { useRef, useState } from "react";
import axios from "axios";
import { checkValidData } from "../utils/validate";

const Login = () => {
  const [isSignInForm, setisSignInForm] = useState(true);
  //console.log(isSignInForm);
  const [showErrorMessage, setshowErrorMessage] = useState("");

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const handleButtonClick = async () => {
    // console.log(name.current.value);
    // console.log(email.current.value);
    // console.log(password.current.value);

    const { isValid, message } = checkValidData(
      // checkValidData function performs overall form validation
      //  and returns an object with isValid and message
      email?.current?.value,
      password?.current?.value,
      name?.current?.value,
      isSignInForm
    );
    setshowErrorMessage(message);

    if (!isValid) {
      console.log("⚠No Record Found⚠");
      return;
    }

    if (!isSignInForm) {
      try {
        const response = await axios.post("/signup", {
          //the url is on the pckj.json file "proxy"
          name: name?.current?.value,
          username: email?.current?.value,
          password: password?.current?.value,
        });
        alert("🟢User Registered Successfully🟢");
        console.log(response.data);
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
      } catch (error) {
        console.log("🔴Registration Faild🔴");
      }
    } else {
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
        alert("✔Signed in successfully");
        window.location.href = "http://localhost:3000/dashboard";
      } catch (error) {
        alert("⚠ User not found");
        console.log("Error signing in");
        // showErrorMessage("Error signing in")
      }
    }
  };

  const togglSignInForm = () => {
    setisSignInForm(!isSignInForm);
  };

  return (
    <div className="">
      <div className="my-12">
        <h1 className="flex items-center justify-center font-bold text-teal-600 text-4xl">
          Question Paper Generator Portal
        </h1>
      </div>

      <form
        className="absolute  p-12 w-3/12 my-22 mx-auto right-0 left-0 shadow-xl  rounded-lg  border border-teal-600 text-green-950"
        onSubmit={(e) => {
          return e.preventDefault();
        }}
      >
        <h1 className="font-bold my-2 text-2xl">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            className="w-full border-2 border-teal-500  text-black p-2 my-1 rounded-md outline-none"
            ref={name}
            type="name"
            placeholder="Full Name"
            onChange={() => {
              checkValidData(
                email.current?.value,
                password.current?.value,
                name.current?.value,
                isSignInForm
              );
            }}
          />
        )}
        <br />

        <input
          className="w-full outline-none border-2 border-teal-500 text-black p-2 my-1 rounded-md"
          ref={email}
          type="email"
          placeholder="Email"
          onChange={() => {
            checkValidData(
              email.current?.value,
              password.current?.value,
              name.current?.value,
              isSignInForm
            );
          }}
        />
        <br />

        <input
          className="w-full outline-none border-2 border-teal-500 text-black p-2 my-1 rounded-md"
          ref={password}
          type="password"
          placeholder="Password"
          onChange={() => {
            checkValidData(
              email.current?.value,
              password.current?.value,
              name.current?.value,
              isSignInForm
            );
          }}
        />
        <p className="font-bold text-red-700">{showErrorMessage}</p>

        <button
          className="w-full p-2 my-1 rounded-md bg-teal-500 text-lime-950 font-semibold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <p
          className="my-2 font-semibold cursor-pointer"
          onClick={togglSignInForm}
        >
          {isSignInForm
            ? "Not have account?  Sign Up"
            : "Already registered? Sign In "}
        </p>
      </form>
    </div>
  );
};

export default Login;
