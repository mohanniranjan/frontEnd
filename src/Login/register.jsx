import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

// Validation schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string().email("Enter a valid email").required("Email is required"),
  password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
  profilePhoto: Yup.mixed().required("Profile photo is required"),
});

export default function Register() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);

  const handlePhotoChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profilePhoto", file); // update Formik field
      setPreview(URL.createObjectURL(file)); // show preview
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Account ✨
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            profilePhoto: null,
          }}
          validationSchema={RegisterSchema}
          onSubmit={(values) => {
            console.log("Register Data:", values);
            alert("Registration Successful!");
            navigate("/login");
          }}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-5">
              {/* Profile Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Photo
                </label>
                <div className="flex items-center space-x-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border border-gray-300"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-400">
                      <User size={24} />
                    </div>
                  )}
                  <label className="cursor-pointer flex items-center space-x-2 text-blue-500 hover:text-blue-700">
                    <Upload size={20} />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handlePhotoChange(e, setFieldValue)}
                    />
                  </label>
                </div>
                {errors.profilePhoto && touched.profilePhoto && (
                  <div className="text-red-500 text-sm mt-1">{errors.profilePhoto}</div>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <Field
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400
                               border ${
                                 errors.name && touched.name
                                   ? "border-red-400"
                                   : "border-gray-300"
                               } focus:ring-2 focus:ring-blue-300 outline-none`}
                  />
                </div>
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
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
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm mt-1" />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 text-gray-400" size={18} />
                  <Field
                    type="password"
                    name="confirmPassword"
                    placeholder="••••••••"
                    className={`w-full pl-10 pr-4 py-2 rounded-lg bg-gray-50 text-gray-800 placeholder-gray-400
                               border ${
                                 errors.confirmPassword && touched.confirmPassword
                                   ? "border-red-400"
                                   : "border-gray-300"
                               } focus:ring-2 focus:ring-blue-300 outline-none`}
                  />
                </div>
                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Register Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-400 to-purple-400 text-white py-2 rounded-lg
                           font-semibold shadow-md hover:opacity-90 transition"
              >
                Register
              </button>

              {/* Extra Links */}
              <div className="text-center text-sm text-gray-600 mt-3">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="hover:text-gray-800 font-medium"
                >
                  Login here
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
