import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import OAuth from "../components/OAuth";
import { API_BASE_URI } from "../main";

const Signup = () => {
  const [formData, setFormData] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChangeHandle = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  console.log("Base URl : ", API_BASE_URI);
  const submitHandle = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);

      const responce = await fetch(`${API_BASE_URI}/api/user/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await responce.json();

      if (data.success === false) {
        setLoading(false);
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
        setLoading(false);
        toast.success(data.message, {
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
      setLoading(false);
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
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          create new account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={submitHandle} method="POST">
          <div>
            <div className="mt-2">
              <input
                name="username"
                type="text"
                onChange={onChangeHandle}
                required
                placeholder="username"
                className="block w-full px-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                name="email"
                type="email"
                onChange={onChangeHandle}
                autoComplete="email"
                required
                placeholder="email"
                className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="mt-2">
            <input
              name="password"
              type="password"
              onChange={onChangeHandle}
              required
              placeholder="password"
              className="block px-3 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>

          <div>
            <button
              disabled={loading}
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-text"
            >
              {loading ? `LOADING` : `SIGN UP`}
            </button>
          </div>
          <hr />
          <div>
            <OAuth />
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-gray-500">
          Alredy have a account?{" "}
          <Link
            to={"/signin"}
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
