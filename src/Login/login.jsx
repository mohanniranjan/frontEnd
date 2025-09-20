import { Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../utils/apiHandler";

// ✅ Validation Schema
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    const payload = {
      email: values.email,
      password: values.password,
    };
    console.log(payload);

    const res = await api.post("/v1/employee/login", payload);
    // console.log(res.data.token);
    if (await res.data.token){
      localStorage.setItem("token",res.data.token)
    }
    navigate('/dashboard')
    

  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Login
        </h2>

        <Formik
          initialValues={{ email: "", password: "" }}
          //   validationSchema={LoginSchema}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                  <Field
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 
                                border ${
                                  errors.email && touched.email
                                    ? "border-red-400"
                                    : "border-gray-300"
                                } focus:ring-2 focus:ring-blue-300 outline-none`}
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-3 top-2.5 text-gray-400"
                    size={18}
                  />
                  <Field
                    type="password"
                    name="password"
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400 
                                border ${
                                  errors.password && touched.password
                                    ? "border-red-400"
                                    : "border-gray-300"
                                } focus:ring-2 focus:ring-blue-300 outline-none`}
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 rounded-lg 
                           font-semibold shadow-md hover:opacity-90 transition"
                onClick={() => navigate("/dashboard")}
              >
                Login
              </button>

              {/* Extra Links */}
              <div className="flex justify-center text-sm text-gray-600 mt-3">
                {/* <button
                  type="button"
                  onClick={() => alert("Forgot Password Clicked")}
                  className="hover:text-gray-800"
                >
                  Forgot Password?
                </button> */}
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="hover:text-gray-800"
                >
                  Create Account
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
