import { useState, useEffect } from "react";
import List from "./List1";
import axios from "axios";

function GetAll() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");

  const fetchTasks = () => {
    const query = `?search=${encodeURIComponent(searchTerm)}&sort=${sortOrder}`;
    axios
      .get(`http://54.90.228.88:3000/tasks${query}`)
      .then((response) => setTasks(response.data))
      .catch((error) => console.error("Error fetching tasks:", error));
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
   <div className="mt-6 max-w-5xl mx-auto">
  
  <div className="flex flex-col sm:flex-row items-center gap-4 mb-6 px-4 py-3 bg-[#F40058] shadow rounded-lg">
    {/*  */}
    <input
      type="text"
      placeholder="Search by title..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="flex-1 px-4 py-2  bg-white shadow-sm  rounded-md focus:ring-1 focus:ring-black focus:outline-none text-black"
    />

    
    <select
      value={sortOrder}
      onChange={(e) => setSortOrder(e.target.value)}
      className="px-2 py-2.5  rounded-md bg-[#EFA500] text-black focus:ring-2 focus:ring-yellow-400 shadow-sm"
    >
      <option value="newest"> Newest First</option>
      <option value="oldest"> Oldest First</option>
    </select>

    <button
      onClick={fetchTasks}
      className="bg-[#EFA500] text-white font-semibold px-5 py-2 rounded-md hover:bg-yellow-600 transition shadow-sm"
    >
      🔍
    </button>
  </div>

  
  <div className="flex flex-wrap justify-start gap-4 px-4">
    {tasks.map((task) => (
      <List key={task.id} {...task} refreshTasks={fetchTasks} />
    ))}
  </div>
</div>

  );
}

export default GetAll;
