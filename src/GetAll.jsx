import { useState, useEffect } from "react";
import List from "./List1";
import axios from "axios";
import Addtodo from "./Addtodo";
import SearchIcon from "@mui/icons-material/Search";

function GetAll() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC");

  const fetchTasks = () => {
    const query = `?search=${encodeURIComponent(searchTerm)}&sortBy=createdAt&order=${sortOrder}`;
    axios
      .get(`http://localhost:3000/tasks${query}`)
      .then((response) => setTasks(response.data))
      .catch((error) => {console.error("Error fetching tasks:", error)
        setSearchTerm('');
        alert("Task not Found !");
      });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <div className="mt-6 flex justify-center">
        <Addtodo refreshTasks={fetchTasks} />
      </div>

      <div className="mt-6 max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row bg-[#003566] items-center gap-4 mb-6 px-4 py-4 shadow rounded-3xl">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 bg-white shadow-sm rounded-l-2xl focus:ring-1 focus:ring-black focus:outline-none text-black"
          />

          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="px-2 py-2.5 bg-[#ffc300] text-[#003566] font-medium focus:ring-2 focus:ring-blue-400 shadow-sm"
          >
            <option value="DESC">Newest First</option>
            <option value="ASC">Oldest First</option>
          </select>

          <button
            onClick={fetchTasks}
            className="bg-[#ffc300] text-[#003566] font-semibold px-5 py-2 rounded-r-2xl hover:bg-n-600 transition shadow-sm hover:bg-white"
          >
           <SearchIcon/>
          </button>
        </div>

        <div className="flex flex-wrap justify-evenly gap-4 px-4">
          {tasks.map((task) => (
            <List key={task.id} {...task} refreshTasks={fetchTasks} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GetAll;
