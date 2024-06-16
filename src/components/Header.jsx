import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        dispatch(removeUser());
        navigate("/");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <div className=" w-screen absolute bg-gradient-to-b from-black px-10 py-4 z-50 flex justify-between">
        <img
          className=" w-48"
          src="https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png"
          alt="logo"
        />
        {user && (
          <div className=" flex m-4">
            <p className="text-black font-semibold text-2xl mr-10 p-2 ">
              Hi🚀{user.displayName}
            </p>
            <img
              className="w-14"
              src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
              alt="user"
            />
            <button
              onClick={handleSignOut}
              className=" text-white font-semibold bg-red-600 rounded m-2 p-2"
            >
              SignOut
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
