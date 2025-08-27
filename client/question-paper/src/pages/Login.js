import { useRef, useState } from "react";
import axios from "axios";
import { checkValidData } from "../utils/validate";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const apiUrl = process.env.REACT_APP_API_URL;

  const [isSignInForm, setisSignInForm] = useState(true);
  //console.log(isSignInForm);
  const [showErrorMessage, setshowErrorMessage] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const navigate = useNavigate();

  const name = useRef();
  const email = useRef();
  const password = useRef();

  const showToast = (msg) => {
    setLoginSuccess(msg);
    setTimeout(() => {
      navigate("/dashboard");
    }, 3000);
  };

  const handleButtonClick = async () => {
    const { isValid, message } = checkValidData(
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
        const response = await axios.post(`${apiUrl}/signup`, {
          name: name?.current?.value,
          username: email?.current?.value,
          password: password?.current?.value,
        });
        showToast("🟢User Registered Successfully🟢");
        //console.log(response.data);
        name.current.value = "";
        email.current.value = "";
        password.current.value = "";
      } catch (error) {
        if (error.response && error.response.status === 409) {
          showToast(`❌ ${error.response.data}`);
        } else {
          console.log("🔴Registration Faild🔴");
        }
      }
    } else {
      try {
        const response = await axios.post(`${apiUrl}/signin`, {
          // name: name?.current.value,
          username: email?.current?.value,
          password: password?.current?.value,
        });
        //console.log(response);

        const token = response.data.token;

        localStorage.setItem("token", token); // Store the token in localStorage

        //console.log("Signed in successfully");
        showToast("✔Signed in successfully");
      } catch (error) {
        localStorage.removeItem("token");
        showToast("❌User not found❌");
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
      {/* Heading */}
      <div className="my-12">
        <h1 className="flex items-center justify-center font-bold text-teal-600 text-2xl sm:text-3xl md:text-4xl text-center px-2">
          Question Paper Generator
        </h1>
      </div>

      {/* Toast Notification */}
      {loginSuccess && (
        <div className="fixed top-24 right-2 sm:right-4 bg-green-800 text-white px-4 py-2 rounded shadow-lg max-w-xs sm:max-w-sm">
          <div>{loginSuccess}</div>
          <div className="mt-2 h-1 bg-white relative overflow-hidden rounded">
            <div className="absolute top-0 left-0 h-full bg-green-800 animate-toast-progress"></div>
          </div>
        </div>
      )}

      {/* Info Box */}
      <div className="mt-4 w-[95%] sm:w-full max-w-md mx-auto p-4 bg-green-100 border-l-4 border-green-700 rounded shadow-md relative">
        <p className="text-red-800 font-medium text-sm sm:text-base text-center sm:text-left">
          * After SignIn/SignUp, please wait for 30 seconds to start the
          server...⏳
        </p>
      </div>

      {/* Form */}
      <form
        className="
      absolute left-0 right-0 mx-auto 
      w-full sm:w-10/12 md:w-6/12 lg:w-4/12 xl:w-3/12
      my-8 p-6 md:p-10 lg:p-12
      shadow-xl rounded-lg border border-teal-600 text-green-950 bg-white
    "
        onSubmit={(e) => e.preventDefault()}
      >
        {/* Form Title */}
        <h1 className="font-bold my-2 text-xl sm:text-2xl lg:text-3xl text-center">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {/* Full Name (Only in Sign Up) */}
        {!isSignInForm && (
          <input
            className="w-full border-2 border-teal-500 text-black p-2 my-2 rounded-md outline-none"
            ref={name}
            type="text"
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

        {/* Email */}
        <input
          className="w-full border-2 border-teal-500 text-black p-2 my-2 rounded-md outline-none"
          ref={email}
          type="text"
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

        {/* Password */}
        <input
          className="w-full border-2 border-teal-500 text-black p-2 my-2 rounded-md outline-none"
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

        {/* Error Message */}
        <p className="font-bold text-red-700 text-sm md:text-base">
          {showErrorMessage}
        </p>

        {/* Submit Button */}
        <button
          className="w-full p-2 my-2 rounded-md bg-teal-500 text-lime-950 font-semibold"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        {/* Toggle Form Link */}
        <p
          className="my-2 font-semibold cursor-pointer text-center md:text-left"
          onClick={togglSignInForm}
        >
          {isSignInForm
            ? "Not have account? Sign Up"
            : "Already registered? Sign In"}
        </p>
      </form>
    </div>
  );
};

export default Login;
