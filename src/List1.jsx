import axios from "axios";
import { useState } from "react";

function List(props) {
  const [status, setStatus] = useState(props.status);
  const [updatedAt, setUpdate] = useState(props.updatedAt);

  const deleteTask = () => {
    console.log("delete pressed");
    axios
      .delete(`http://54.90.228.88:3000/tasks/${props.id}`)
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
      .patch(`http://54.90.228.88:3000/tasks/${props.id}/status`, {
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
    <div className="bg-[#EFA500] rounded-lg shadow-md p-3 w-60 m-4 float-left flex flex-col">
      <button
        className={
          status === "TODO"
            ? "status-btn mb-2 px-3 py-1 font-medium bg-white text-black rounded text-sm shadow-black hover:bg-gray-300 transition-colors"
            : "status-btn mb-2 px-3 py-1 font-medium bg-[#41B853] text-white rounded text-sm shadow-black hover:bg-gray-300 transition-colors"
        }
        onClick={changeTaskStatus}
      >
        {status}
      </button>

      <h1 className="text-base text-black mb-1.5 font-bold break-words">
        {props.title}
      </h1>

      <p className="text-lg text-black mb-2.5 whitespace-pre-wrap break-words">
        {props.description}
      </p>

      <p className="text-sm text-gray-600 mb-2.5">
        Created: {new Date(props.createdAt).toLocaleString()}
      </p>

      <p className="text-sm text-gray-600 mb-2.5">
        Updated: {new Date(updatedAt).toLocaleString()}
      </p>

      <div className="mt-auto flex justify-end">
        <button
          className="delete-btn text-white bg-red-500 py-1.5 px-3 rounded text-sm transition-colors font-medium"
          onClick={deleteTask}
        >
          DELETE
        </button>
      </div>
    </div>
  );
}

export default List;
