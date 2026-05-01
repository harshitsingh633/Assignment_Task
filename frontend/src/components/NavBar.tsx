import { useState } from "react";
import { useNavigate } from "react-router-dom";


export function NavBar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="p-2">
      <div className="flex items-center">
        <h1 className="sm:text-4xl text-5xl font-bold mt-2 ml-3 select-none text-[#BB8ED0]">
          Daily Tasks
        </h1>
        <button
          className="sm:hidden ml-auto mr-4 text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
        </button>
        <div className="hidden sm:flex ml-auto">
          <button 
          onClick={() => navigate("/login")}
          className="font-semibold mt-2 mb-5 p-2 m-2 hover:text-purple-900"
          >
            Home
          </button>
          <button 
          onClick={() => navigate("/login")}
          className="font-semibold mt-2 mb-5 p-2 m-2 hover:text-purple-900">
            FAQ
          </button>
          <button
            onClick={() => navigate("/login")}
            className="font-semibold mt-2 mb-5 p-2 m-2 hover:text-purple-900"
          >
            Sign In
          </button>
          <button
            onClick={() => navigate("/signup")}
            className="font-semibold rounded-4xl border-2 border-purple-400 mt-2 m-4 p-2 hover:border-b-purple-900"
          >
            SignUp
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden flex flex-col items-center mt-4">
          <button className="p-2" onClick={() => {setIsOpen(false)
            navigate("/signin")
          }}>
            Home
          </button>
          <button className="p-2" onClick={() => {setIsOpen(false)
            navigate("/signin")
          }}>
            FAQ
          </button>
          <button
            className="p-2"
            onClick={() => {
              setIsOpen(false);
              navigate("/signin");
            }}
          >
            Sign In
          </button>
          <button
            className="p-2 border-2 border-purple-400 rounded-xl"
            onClick={() => {
              setIsOpen(false);
              navigate("/signup");
            }}
          >
            SignUp
          </button>
        </div>
      )}
    </div>
  );
}