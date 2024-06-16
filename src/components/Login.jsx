import React, { useRef, useState } from "react";
import Header from "./Header";
import { formValidate } from "..//utils/validate";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [isSignInform, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInform);
  };

  const handleSignIn = () => {
    const message = formValidate(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInform) {
      // signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name.current.value,
          })
            .then(() => {
              // Profile updated!
              const { uid, email, displayName } = auth.currentUser;
              dispatch(
                addUser({ uid: uid, email: email, displayName: displayName })
              );
              navigate("/browse");
              // ...
            })
            .catch((error) => {
              // An error occurred
              // ...
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
          // ..
        });
    } else {
      // signin logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigate("/browse");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  };

  return (
    <>
      <Header />
      <div>
        <img
          className=" w-[100vw] h-screen absolute"
          src="https://assets.nflxext.com/ffe/siteui/vlv3/51c1d7f7-3179-4a55-93d9-704722898999/be90e543-c951-40d0-9ef5-e067f3e33d16/IN-en-20240610-popsignuptwoweeks-perspective_alpha_website_medium.jpg"
          alt="background"
        />
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" absolute bg-black bg-opacity-85 w-[28%] my-[5%] mx-auto right-0 left-0"
      >
        <div className=" w-[75%] mx-auto m-8">
          <h1 className=" text-white p-2 mb-4 text-3xl font-medium">
            {isSignInform ? "Sign In" : "Sign Up"}
          </h1>
          {!isSignInform && (
            <input
              ref={name}
              type="text"
              placeholder="Name"
              className="w-full p-3 m-3 bg-black text-white bg-opacity-85 border border-white rounded
            "
            />
          )}
          {!isSignInform && (
            <input
              ref={phone}
              type="number"
              placeholder="Phone Number"
              className="w-full p-3 m-3 bg-black text-white bg-opacity-85 border border-white rounded
            "
            />
          )}
          <input
            ref={email}
            type="text"
            placeholder="Email Address"
            className="w-full p-3 m-3 bg-black text-white bg-opacity-85 border border-white rounded
            "
          />
          <input
            ref={password}
            type="password"
            placeholder="Password"
            className="w-full p-3 m-3 bg-black text-white bg-opacity-85 border border-white rounded"
          />
          <p className=" text-red-500 font-medium text-xl p-3 ">
            {errorMessage}
          </p>
          <button
            onClick={handleSignIn}
            className=" w-full m-3 p-2 text-white bg-red-600 rounded"
          >
            {isSignInform ? "Sign In" : "Sign Up"}
          </button>
          <h1 className=" text-gray-500 p-2 text-center">OR</h1>
          <h1 className=" text-gray-300 p-2 text-center mb-2 hover:underline cursor-pointer">
            Forgot password?
          </h1>
          <input type="checkbox" className=" p-2 m-3" />{" "}
          <span className="text-white p-2">Remember me</span>
          <h1 className=" text-gray-500 p-2 font-font-poppins">
            {isSignInform ? "New to Netflix?" : "Already a user?"}
            <span
              onClick={toggleSignInForm}
              className="text-white p-2 cursor-pointer hover:underline"
            >
              {isSignInform ? "Sign up now." : "Sign in."}
            </span>
          </h1>
        </div>
      </form>
    </>
  );
};

export default Login;
