import { Routes, Route, Navigate } from "react-router-dom";
import Login from './Login/login';
import Register from "./Login/register";
import Dashboard from "./Dashboard/dashboard";

function App() {
 

  return (
    <>
     <Routes>
      {/* Default route goes to login */}
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
