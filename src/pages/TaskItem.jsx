import React, { useState } from "react";
import toast from "react-hot-toast";
import { API_BASE_URI } from "../main";

const TaskItem = ({ task }) => {
  const [isTaskEditable, setIsTaskEditable] = useState(false);
  const [taskMsg, setTaskMesg] = useState(task.title);

  const handleDelete = async () => {
    const responce = await fetch(`${API_BASE_URI}/api/task/${task._id}`, {
      method: "DELETE",
      credentials: "include",
    });
    const data = await responce.json();

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
      toast.success(data.message, {
        duration: 3000,
        style: {
          color: "#fff",
          background: "#000",
        },
      });
      return;
    }
  };

  const toogleTask = async () => {
    const responce = await fetch(`${API_BASE_URI}/api/task/${task._id}`, {
      method: "PUT",
      credentials: "include",
    });
    const data = await responce.json();

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
      toast.success(data.message, {
        duration: 3000,
        style: {
          color: "#fff",
          background: "#000",
        },
      });
      return;
    }
  };

  const handleUpdate = async () => {
    setIsTaskEditable(true);
    const responce = await fetch(`${API_BASE_URI}/api/task/edit/${task._id}`, {
      method: "PUT",
      headers: { "Content-Type": "Application/json" },
      credentials: "include",
      body: JSON.stringify({
        title: task.title,
      }),
    });
    const data = await responce.json();
    setIsTaskEditable(false);
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
      toast.success(data.message, {
        duration: 3000,
        style: {
          color: "#fff",
          background: "#000",
        },
      });
      return;
    }
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        task.isCompleted ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={task.isCompleted}
        onChange={toogleTask}
      />
      <input
        type="text"
        value={taskMsg}
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTaskEditable ? "border-black/10 px-2" : "border-transparent"
        } ${task.isCompleted ? "line-through" : ""}`}
        onChange={(e) => setTaskMesg(e.target.value)}
        readOnly={!isTaskEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (task.isCompleted) return;

          if (isTaskEditable) {
            handleUpdate();
          } else setIsTaskEditable((prev) => !prev);
        }}
        disabled={task.isCompleted}
      >
        {isTaskEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Task Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={handleDelete}
      >
        ❌
      </button>
    </div>
  );
};

export default TaskItem;
