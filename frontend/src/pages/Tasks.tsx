import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const Tasks = () => {
  const { projectId } = useParams();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `https://assignment-task-ckag.onrender.com/api/v1/tasks/${projectId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Create task
  const createTask = async () => {
    if (!title) return;

    try {
      await axios.post(
        "https://assignment-task-ckag.onrender.com/api/v1/tasks",
        {
          title,
          description,
          projectId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setTitle("");
      setDescription("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  // Update status
  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.put(
        `https://assignment-task-ckag.onrender.com/api/v1/tasks/${id}`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {/* Create Task */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 rounded w-1/3"
        />
        <button
          onClick={createTask}
          className="bg-black text-white px-4 rounded"
        >
          + Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">

        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white p-4 rounded shadow flex justify-between items-center"
          >
            <div>
              <h2 className="font-semibold">{task.title}</h2>
              <p className="text-sm text-gray-500">{task.description}</p>
            </div>

            {/* Status Dropdown */}
            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
              className="border p-1 rounded"
            >
              <option value="TODO">TODO</option>
              <option value="IN_PROGRESS">IN_PROGRESS</option>
              <option value="DONE">DONE</option>
            </select>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Tasks;
