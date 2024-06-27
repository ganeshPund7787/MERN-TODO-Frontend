import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <>
      <div className="flex p-5 bg-slate-800  text-white justify-between">
        <div className="w-[76vw] lg:w-[40vw] flex font-bold text-lg">
          Task Manager
        </div>
        <div className="flex justify-evenly w-[80vw] md:w-[24vw] text-white">
          <Link to={"/"} className="hover:text-yellow-500 font-bold">
            Home
          </Link>

          {currentUser ? (
            <>
              <Link to={"/tasks"} className="hover:text-yellow-500 font-bold">
                Tasks
              </Link>
              <Link to={"/profile"} className="hover:text-yellow-500 font-bold">
                Profile
              </Link>
            </>
          ) : (
            <Link to={"/signin"} className="hover:text-yellow-500 font-bold">
              Sign in
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

export default Header;
