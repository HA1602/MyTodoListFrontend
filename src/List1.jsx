import axios from "axios";
import { useState } from "react";

function List(props) {
  const [status, setStatus] = useState(props.status);
  const [updatedAt, setUpdate] = useState(props.updatedAt);

  const deleteTask = () => {
    console.log("delete pressed");
    axios
      .delete(`http://localhost:3000/tasks/${props.id}`)
      .then((response) => {
        console.log(" Resource deleted:", response.data);
        props.refreshTasks();
      })
      .catch((error) => {
        console.error("Error deleting item:", error);
      });
  };

  const changeTaskStatus = () => {
    const newStatus = status === "TODO" ? "DONE" : "TODO";
    axios
      .patch(`http://localhost:3000/tasks/${props.id}/status`, {
        status: newStatus,
      })
      .then((response) => {
        console.log("Task updated:", response.data);
        setStatus(newStatus);
        setUpdate(response.data.updatedAt);
      })
      .catch((error) => {
        console.error("Error updating todo:", error);
      });
  };

  return (
    <div className="bg-[#003566] rounded-lg shadow-md p-3 w-60 m-4 float-left flex flex-col hover:scale-105 hover:shadow-xl hover:shadow-black">
      <button
        className={
          status === "TODO"
            ? "status-btn mb-2 px-1 py-1 font-medium bg-white text-[#003566] rounded text-sm shadow-black hover:bg-[#41B853] transition-colors"
            : "status-btn mb-2 px-1 py-1 font-medium bg-[#41B853] text-white rounded text-sm shadow-black hover:bg-gray-300 transition-colors"
        }
        onClick={changeTaskStatus}
      >
        {status}
      </button>

      <h1 className="text-xl text-[#ffc300] mb-2.5 mt-2.5 font-bold break-words">
        {props.title.toUpperCase()}
      </h1>

      <p className="text-lg text-white mb-2.5 whitespace-pre-wrap break-words">
        {props.description}
      </p>

      <p className="text-sm text-gray-300 mb-2.5">
        Created: {new Date(props.createdAt).toLocaleString()}
      </p>

      <p className="text-sm text-gray-300 mb-4.5">
        Updated: {new Date(updatedAt).toLocaleString()}
      </p>

      <div className="mt-auto py- flex justify-end">
        <button
          className="delete-btn text-white bg-red-500 py-1 px-2.5 rounded-3xl text-sm transition-colors font-medium  hover:bg-red-900"
          onClick={deleteTask}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default List;
