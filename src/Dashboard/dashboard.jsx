import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "lucide-react";
import EmployeesTable from "../Employees/emloyee";

export default function Dashboard() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "Nandu Vallakati",
    email: "nanduvallakati@example.com",
    profilePhoto: null,
  });

  const [activeModule, setActiveModule] = useState("home"); // track current module
  const [employees, setEmployees] = useState([]);

  // Fetch employee data only when Employees module is active
  useEffect(() => {
    if (activeModule === "employees") {
      fetch("https://your-backend.com/api/employees")
        .then((res) => res.json())
        .then((data) => setEmployees(data))
        .catch((err) => console.error(err));
    }
  }, [activeModule]);

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white/90 backdrop-blur-md shadow-lg flex flex-col p-6">
        <div className="flex items-center space-x-4 mb-6">
          {user.profilePhoto ? (
            <img
              src={user.profilePhoto}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-gray-300"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
              <User size={24} />
            </div>
          )}
          <div>
            <h3 className="text-gray-800 font-semibold">{user.name}</h3>
            <p className="text-gray-500 text-sm">{user.email}</p>
          </div>
        </div>

        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => setActiveModule("employees")}
            className={`flex items-center space-x-2 text-gray-700 font-medium hover:text-blue-500 transition ${
              activeModule === "employees" ? "font-bold text-blue-500" : ""
            }`}
          >
            Employees
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 mt-8 text-white bg-gradient-to-r from-blue-400 to-purple-400 py-2 px-3 rounded-lg font-semibold hover:opacity-90 transition"
          >
            <User size={20} /> Logout
          </button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeModule === "home" && (
          <>
            {/* Home / Welcome Section */}
            <div className="bg-white rounded-2xl p-6 mb-6 shadow-md flex flex-col items-center sm:flex-row sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 mb-2">
                  Welcome Back, {user.name}!
                </h1>
                <p className="text-gray-600">
                  Here’s a quick overview of your account.
                </p>
              </div>

              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt="Profile"
                  className="w-48 rounded-xl shadow-lg mt-4 sm:mt-0 object-cover border border-gray-200"
                />
              ) : (
                <div className="w-48 h-48 rounded-xl bg-gray-200 flex items-center justify-center text-gray-400 mt-4 sm:mt-0">
                  <User size={64} />
                </div>
              )}
            </div>
          </>
        )}

        {activeModule === "employees" && (
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Employees</h2>
            <EmployeesTable employees={employees} />
          </div>
        )}
      </main>
    </div>
  );
}
