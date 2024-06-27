import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { fetchtoggle, fetchSuccess } from "../app/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { API_BASE_URI } from "../main";

const OAuth = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleClick = async () => {
    try {
      dispatch(fetchtoggle());
      const Provider = new GoogleAuthProvider();
      const Auth = getAuth(app);
      const result = await signInWithPopup(Auth, Provider);
      const user = result.user;

      const responce = await fetch(`${API_BASE_URI}/api/user/googleAuth`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: user.displayName,
          email: user.email,
        }),
      });
      const data = await responce.json();

      if (data.success === false) {
        dispatch(fetchtoggle());
        toast.error(data.message, {
          duration: 3000,
          style: {
            color: "#fff",
            background: "#000",
          },
        });
        return;
      }

      if (data) {
        dispatch(fetchSuccess(data));
        toast.success(`welcome ${data.username}`, {
          duration: 3000,
          style: {
            color: "#fff",
            background: "#000",
          },
        });
        navigate("/");
        return;
      }
    } catch (error) {
      dispatch(fetchtoggle());
      toast.error(error.message, {
        duration: 3000,
        style: {
          color: "#fff",
          background: "#000",
        },
      });
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        type="submit"
        disabled={loading}
        className="flex disabled:text-green-400 disabled:cursor-not-allowed w-full justify-center rounded-md bg-green-600 hover:bg-green-400 px-3 py-1.5 text-sm font-semibold leading-6 uppercase text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
      >
        {loading ? "LOADING......." : "continue with Google"}
      </button>
    </div>
  );
};

export default OAuth;
