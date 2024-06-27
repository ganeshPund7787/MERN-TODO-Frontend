import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPlus } from "react-icons/fa";
import { useSelector } from "react-redux";
import { API_BASE_URI } from "../main";

const Home = () => {
  const [formData, setFormData] = useState();
  const [value, setValue] = useState("");
  const { currentUser } = useSelector((state) => state.user);

  const handleInput = (e) => {
    setValue(e.target.value);
    setFormData({ title: e.target.value });
  };

  const handleClick = async (e) => {
    try {
      e.preventDefault();
      const validInput = formData.title.trim();

      if (validInput === "") {
        toast.error("You must write something", {
          duration: 2000,
          style: {
            color: "#fff",
            background: "#000",
          },
        });
        return;
      }

      const responce = await fetch(`${API_BASE_URI}/api/task/new`, {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });
      const data = await responce.json();

      if (data.success == false) {
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
        setValue("");
        toast.success(data.message, {
          duration: 3000,
          style: {
            color: "#fff",
            background: "#000",
          },
        });
        return;
      }
    } catch (error) {
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
    <>
      {currentUser ? (
        <div
          className="h-[100vh] w-[100%] flex flex-col items-center space-y-5"
          style={{
            backgroundImage:
              "url(https://plus.unsplash.com/premium_photo-1683309563255-fef9e541cdec?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
            backgroundSize: "cover",
          }}
        >
          <div
            className="h-full w-full p-5 flex flex-col items-center"
            style={{ background: "rgba(0,0,0,0.6)" }}
          >
            <div>
              <h1 className="text-3xl text-white font-bold mt-[10rem]">
                Add Your Task here...
              </h1>
            </div>

            <div>
              <form>
                <div className="flex p-2 justify-center mt-[2rem]">
                  <input
                    required={true}
                    autoFocus
                    type="text"
                    name="title"
                    value={value}
                    onChange={handleInput}
                    className="w-[70vw] lg:w-[50vw] p-3 outline-none rounded-l-full bg-pink-200"
                    placeholder="Add Task here ..."
                  />
                  <button
                    type="submit"
                    className="bg-orange-500 px-8 font-bold rounded-r-full flex justify-between gap-2 items-center"
                    onClick={handleClick}
                  >
                    Add <FaPlus />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-100% w-100% flex justify-between">
          <div className="h-full w-[50%] p-52 text-4xl tracking-tighter font-bold uppercase animate-bounce">
            You should Login first...
          </div>
          <div>
            <img
              src="https://rurutek.com/jio/assets/img/login-animate.gif"
              alt=""
              srcset=""
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
