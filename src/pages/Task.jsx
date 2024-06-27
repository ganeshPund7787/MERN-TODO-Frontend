import React, { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import { API_BASE_URI } from "../main";

const Task = () => {
  const [taskData, setUserData] = useState([]);

  console.log(taskData);
  useEffect(() => {
    fetch(`${API_BASE_URI}/api/task/all`, {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch((e) => console.log(`Error while map task ${e}`));
  }, [taskData]);

  return (
    <>
      {taskData.length !== 0 ? (
        <div className="flex flex-col items-center gap-5 mt-[3rem]">
          {taskData.map((task, idx) => (
            <TaskItem key={task._id} task={task} />
          ))}
        </div>
      ) : (
        <div className="p-40 text-black flex flex-col items-center">
          <img
            src="https://media.tenor.com/IqsFmJA4aA0AAAAj/ooz-ooznmates.gif"
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Task;
