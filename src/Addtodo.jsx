import { useState } from "react";
import CreateTodo from "./CreateTodo";

function Addtodo({ refreshTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const refreshForm = () => {
    setTitle("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title cannot be empty");
    if (description.length > 100) {
      refreshForm();
      return alert("Description crossed word limit");

    }
    try {
      await CreateTodo(title, description);
      refreshTasks();
      refreshForm();
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to add task");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#003566] p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mb-6"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full mb-3 px-4 py-2 bg-white rounded-md focus:ring focus:ring-yellow-400 focus:bg-gray-200"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        name="description"
        placeholder="Describe the task..."
        rows="3"
        className="w-full mb-4 px-4 py-2 bg-white rounded-md focus:ring focus:ring-yellow-400 focus:bg-gray-200"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#ffc300] text-[#003566] font-semibold px-5 py-2 rounded-md hover:bg-white transition"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default Addtodo;
