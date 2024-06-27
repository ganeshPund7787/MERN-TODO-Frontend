import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchtoggle, fetchSuccess } from "../app/User/userSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import OAuth from "../components/OAuth";
import { API_BASE_URI } from "../main";

const Signin = () => {
  const [formData, setFormData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };
  const { loading } = useSelector((state) => state.user);

  const submitHandle = async (e) => {
    try {
      e.preventDefault();
      dispatch(fetchtoggle());
      const responce = await fetch(`${API_BASE_URI}/api/user/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
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
    <div className="flex mt-[7rem] flex-1 flex-col justify-center px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          SIGN IN
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandle} method="POST">
          <div>
            <div className="mt-2">
              <input
                placeholder="email"
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                onChange={onChangeHandle}
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                placeholder="password"
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                onChange={onChangeHandle}
                className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? `LOADING...` : `SIGN IN`}
            </button>
          </div>
          <hr />
          <div>
            <OAuth />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Not a account?{" "}
          <Link
            to={"/signup"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
