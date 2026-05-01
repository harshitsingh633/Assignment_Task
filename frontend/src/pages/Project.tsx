import { useEffect, useState } from "react";
import axios from "axios";

const Projects = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const token = localStorage.getItem("token");

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("https://assignment-task-ckag.onrender.com/api/v1/projects", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProjects(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Create project
  const createProject = async () => {
    if (!name) return;

    try {
      await axios.post(
        "https://assignment-task-ckag.onrender.com/api/v1/projects",
        { name, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setName("");
      setDescription("");
      fetchProjects(); // refresh list
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-2xl font-bold mb-4">Projects</h1>

      {/* Create Project */}
      <div className="bg-white p-4 rounded shadow mb-6 flex gap-3">
        <input
          type="text"
          placeholder="Project name"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
          onClick={createProject}
          className="bg-black text-white px-4 rounded"
        >
          + Create
        </button>
      </div>

      {/* Project List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-md"
          >
            <h2 className="text-lg font-semibold">{project.name}</h2>
            <p className="text-sm text-gray-500">
              {project.description}
            </p>
          </div>
        ))}

      </div>
    </div>
  );
};

export default Projects;
