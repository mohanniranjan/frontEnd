import { useEffect } from "react";
import { Link } from "react-router-dom";
import api from "./utils/apiHandler";

export default function Home() {

    useEffect(()=>{
        
getEmpData()

    },[])

async function getEmpData() {
    const res=await api.get("/v1/employees/getAll")
   
    console.log("employtee Data :",res)

    
}

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-4xl font-bold mb-8 text-gray-800">Welcome to Home Page</h1>
      
      <div className="flex flex-col space-y-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
        >
          Register
        </Link>
        <Link
          to="/dashboard"
          className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
        >
          Dashboard
        </Link>
      </div>
    </div>
  );
}
