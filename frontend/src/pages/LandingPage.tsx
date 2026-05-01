import { useNavigate } from "react-router-dom";
import { NavBar } from "../components/NavBar";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-b to-pink-300 from-pink-100 min-h-screen">

      {/* Navbar */}
      <NavBar />

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-4 mt-20">

        {/* Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Manage Projects & Tasks Effortlessly
        </h1>

        {/* Subtext */}
        <p className="text-gray-600 max-w-xl mb-8">
          A simple and efficient platform to create projects, assign tasks,
          track progress, and collaborate with your team — all in one place.
        </p>

        {/* Buttons */}
        <div className="flex gap-4">

          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
          >
            Get Started
          </button>

          <button
            onClick={() => navigate("/signup")}
            className="border px-6 py-2 rounded-md hover:bg-gray-100 transition"
          >
            Create Account
          </button>

        </div>

      </div>

      {/* Optional Feature Section */}
      <div className="mt-24 px-6 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">

  {/* Card 1 */}
  <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-400 to-purple-400 rounded-t-xl"></div>

    <h3 className="font-semibold text-lg mb-2 text-gray-800">
      Project Management
    </h3>

    <p className="text-sm text-gray-600">
      Organize your work into structured projects with clarity and control.
    </p>
  </div>

  {/* Card 2 */}
  <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-blue-400 to-indigo-400 rounded-t-xl"></div>

    <h3 className="font-semibold text-lg mb-2 text-gray-800">
      Task Tracking
    </h3>

    <p className="text-sm text-gray-600">
      Create tasks, update status, and monitor progress effortlessly.
    </p>
  </div>

  {/* Card 3 */}
  <div className="relative bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

    <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-green-400 to-emerald-400 rounded-t-xl"></div>

    <h3 className="font-semibold text-lg mb-2 text-gray-800">
      Team Collaboration
    </h3>

    <p className="text-sm text-gray-600">
      Assign tasks and collaborate with your team seamlessly.
    </p>
  </div>

</div>

    </div>
  );
};

export default LandingPage;
