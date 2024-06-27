import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  deleteUser,
  logoutUser,
  updateCancel,
  updateStart,
  updateSuccess,
  fetchtoggle,
} from "../app/User/userSlice";
import { toast } from "react-hot-toast";
import { API_BASE_URI } from "../main";

const Profile = () => {
  const { currentUser, isEditable, loading } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userdata, setuserData] = useState({});

  const handleDelete = async () => {
    try {
      const permission = confirm("Are you sure delete youe acccount");
      const res = await fetch(`${API_BASE_URI}/api/user/${currentUser._id}`, {
        method: "DELETE",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success === false) {
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
        dispatch(deleteUser());
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
      toast.error(error.message, {
        duration: 3000,
        style: {
          color: "#fff",
          background: "#000",
        },
      });
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch(`${API_BASE_URI}/api/user/logout`, {
        method: "get",
        credentials: "include",
      });
      const data = await res.json();

      if (data.success === false) {
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
        dispatch(logoutUser());
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
      toast.error(`Error While logout user ${error.message}  `, {
        duration: 3000,
        style: {
          color: "#fff",
          background: "#000",
        },
      });
    }
  };

  const setObject = (e) => {
    setuserData({ ...userdata, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      dispatch(fetchtoggle());
      const res = await fetch(`${API_BASE_URI}/api/user/${currentUser._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "Application/json",
        },
        credentials: "include",
        body: JSON.stringify(userdata),
      });
      const data = await res.json();

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
        dispatch(updateCancel());
        dispatch(fetchtoggle());
        dispatch(updateSuccess(data.userData));
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
    <div className="mt-28 sm:mx-auto sm:w-full sm:max-w-sm p-5">
      {isEditable ? (
        <div>
          <form className="space-y-6" method="POST">
            <div>
              <div className="mt-2">
                <input
                  placeholder="change username"
                  title="User Name"
                  name="username"
                  type="text"
                  onChange={setObject}
                  defaultValue={currentUser.username}
                  className="font-bold block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300"
                />
              </div>
            </div>

            <div className="mt-2">
              <input
                placeholder="Change Password"
                title="password"
                name="password"
                type="email"
                onChange={setObject}
                defaultValue={""}
                className="font-bold block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300"
              />
            </div>
          </form>

          <div className="mt-8 flex justify-between">
            <button
              type="button"
              onClick={() => dispatch(updateCancel())}
              className="flex justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              cancel
            </button>
            <button
              type="submit"
              onClick={handleUpdate}
              disabled={loading}
              className="disabled:cursor-not-allowed flex justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {loading ? `Loading` : `Update`}
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                title="User Name"
                name="username"
                type="text"
                readOnly
                value={currentUser.username}
                className="uppercase font-bold block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300"
              />
            </div>
          </div>

          <div>
            <div className="mt-2">
              <input
                placeholder="password"
                title="user email"
                name="email"
                type="email"
                value={currentUser.email}
                readOnly
                className="font-bold block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 outline-none ring-1 ring-inset ring-gray-300"
              />
            </div>
          </div>
          <div>
            <button
              onClick={() => dispatch(updateStart())}
              type="button"
              className="flex w-full justify-center rounded-md bg-orange-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Edit Profile
            </button>
          </div>
        </div>
      )}

      <div className={`justify-between mt-5 ${isEditable ? "hidden" : "flex"}`}>
        <button onClick={handleDelete}>Delete Account </button>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Profile;
