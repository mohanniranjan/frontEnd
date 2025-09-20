import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Login from "./Login/login";
import Register from "./Login/register";
import Dashboard from "./Dashboard/dashboard";
import Home from "./Home";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    // save where the user wanted to go
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
}

export default function App() {
  return (
    <>
      <Routes>
        {/* Default route goes to login */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}
