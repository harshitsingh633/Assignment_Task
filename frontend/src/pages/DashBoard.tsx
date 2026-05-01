import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [data, setData] = useState<any>(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [newTask, setNewTask] = useState({ title: "", description: "", projectId: "" });
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const res = await axios.get("https://assignment-task-ckag.onrender.com/api/v1/dashboard", {
        headers: { Authorization: `Bearer ${token}` },
      });
      // We also fetch projects so we can select one when creating a task
      const projRes = await axios.get("https://assignment-task-ckag.onrender.com/api/v1/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData({ ...res.data, projectList: projRes.data });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleCreateProject = async () => {
    await axios.post("https://assignment-task-ckag.onrender.com/api/v1/projects", newProject, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setShowProjectForm(false);
    fetchData();
  };

  const handleCreateTask = async () => {
    await axios.post("https://assignment-task-ckag.onrender.com/api/v1/tasks", newTask, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setShowTaskForm(false);
    fetchData();
  };

  if (!data) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button onClick={() => { localStorage.removeItem("token"); navigate("/login"); }} className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-xs text-gray-500">Total</p><h2 className="text-xl font-bold">{data.total}</h2></div>
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-xs text-gray-500">Done</p><h2 className="text-xl font-bold text-green-500">{data.completed}</h2></div>
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-xs text-gray-500">Pending</p><h2 className="text-xl font-bold text-yellow-500">{data.pending}</h2></div>
        <div className="bg-white p-4 rounded-xl shadow"><p className="text-xs text-gray-500">Overdue</p><h2 className="text-xl font-bold text-red-500">{data.overdue}</h2></div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button onClick={() => setShowProjectForm(true)} className="bg-black text-white px-4 py-2 rounded-lg text-sm">+ New Project</button>
        <button onClick={() => setShowTaskForm(true)} className="bg-white border px-4 py-2 rounded-lg text-sm font-medium">+ New Task</button>
      </div>

      {/* Forms*/}
      {(showProjectForm || showTaskForm) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-xl font-bold mb-4">{showProjectForm ? "Create Project" : "Create Task"}</h2>
            
            {showProjectForm ? (
              <div className="space-y-4">
                <input className="w-full border p-2 rounded" placeholder="Project Name" onChange={(e)=>setNewProject({...newProject, name: e.target.value})} />
                <textarea className="w-full border p-2 rounded" placeholder="Description" onChange={(e)=>setNewProject({...newProject, description: e.target.value})} />
                <button onClick={handleCreateProject} className="w-full bg-black text-white p-2 rounded">Create</button>
              </div>
            ) : (
              <div className="space-y-4">
                <select className="w-full border p-2 rounded" onChange={(e)=>setNewTask({...newTask, projectId: e.target.value})}>
                  <option value="">Select Project</option>
                  {data.projectList?.map((p:any) => <option key={p._id} value={p._id}>{p.name}</option>)}
                </select>
                <input className="w-full border p-2 rounded" placeholder="Task Title" onChange={(e)=>setNewTask({...newTask, title: e.target.value})} />
                <textarea className="w-full border p-2 rounded" placeholder="Task Description" onChange={(e)=>setNewTask({...newTask, description: e.target.value})} />
                <button onClick={handleCreateTask} className="w-full bg-black text-white p-2 rounded">Create</button>
              </div>
            )}
            <button onClick={() => {setShowProjectForm(false); setShowTaskForm(false);}} className="w-full mt-2 text-gray-500 text-sm">Cancel</button>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="bg-white p-4 rounded-xl shadow mb-6">
        <h2 className="font-semibold mb-2">Your Projects</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {data.projectList?.map((p:any) => (
            <div key={p._id} className="border px-3 py-1 rounded-full text-sm bg-gray-50 whitespace-nowrap">{p.name}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
