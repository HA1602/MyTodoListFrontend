import { useState } from "react";
import CreateTodo from "./CreateTodo";

function Addtodo() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title cannot be empty");
    CreateTodo(title, description);
    setTitle("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#43BEE5] p-6 rounded-lg shadow-md w-full max-w-lg mx-auto mb-6"
    >
      

      <input
        type="text"
        name="title"
        placeholder="Title"
        className="w-full mb-3 px-4 py-2  bg-white rounded-md focus:ring focus:ring-yellow-400"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        name="description"
        placeholder="Describe the task..."
        rows="3"
        className="w-full mb-4 px-4 py-2 bg-white rounded-md focus:ring focus:ring-yellow-400"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-[#161B40] text-blue-200 font-semibold px-5 py-2 rounded-md hover:bg-black transition"
        >
          Add Todo
        </button>
      </div>
    </form>
  );
}

export default Addtodo;
