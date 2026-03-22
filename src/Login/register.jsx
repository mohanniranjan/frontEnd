import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Lock, Upload } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../utils/apiHandler";

// ✅ Validation Schema
const RegisterSchema = Yup.object().shape({
  name: Yup.string().required("Full name is required"),
  email: Yup.string()
    .email("Enter a valid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm your password"),
 
});

export default function Register() {
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const [image, setImage] = useState(null);

  // ✅ Handle image preview + formik value
  const handlePhotoChange = (e, setFieldValue) => {
    const file = e.target.files[0];
    if (file) {
      setFieldValue("profile_pic", file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ✅ Submit handler
  const handleSubmit = async (values, { resetForm }) => {
    try {
      console.log(values.profile_pic)
      const formData = new FormData();
      formData.append("username", values.name);
      formData.append("email", values.email);
     
      formData.append("password", values.password);
      formData.append("profile_pic", values.profile_pic); // ⚠️ MUST match backend

      // 🔍 Debug FormData
      for (let pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }

      const res = await api.post("/api/register/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response:", res.data);

  

      alert("Registration successful!");

      resetForm();
      setPreview(null);

      // ✅ Navigate to login
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100">
      
      {/* FORM CARD */}
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96 border border-gray-200">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          Create Account ✨
        </h2>

        <Formik
          initialValues={{
            name: "",
            email: "",
            age: "",
            password: "",
            confirmPassword: "",
            profilePhoto: null,
          }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched, setFieldValue }) => (
            <Form className="space-y-5">

              {/* PROFILE PHOTO */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Photo
                </label>

                <div className="flex items-center space-x-4">
                  {preview ? (
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-16 h-16 rounded-full object-cover border"
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                      <User size={24} />
                    </div>
                  )}

                  <label className="cursor-pointer flex items-center space-x-2 text-blue-500">
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

                <ErrorMessage
                  name="profilePhoto"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              {/* NAME */}
              <div>
                <label className="text-sm">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5" size={18} />
                  <Field
                    name="name"
                    className="w-full pl-10 p-2 border rounded"
                  />
                </div>
                <ErrorMessage name="name" component="div" className="text-red-500 text-sm"/>
              </div>

              {/* EMAIL */}
              <div>
                <label className="text-sm">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5" size={18} />
                  <Field
                    name="email"
                    className="w-full pl-10 p-2 border rounded"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="text-red-500 text-sm"/>
              </div>

              {/* AGE */}
              <div>
                <label className="text-sm">Age</label>
                <Field
                  name="age"
                  className="w-full p-2 border rounded"
                />
                <ErrorMessage name="age" component="div" className="text-red-500 text-sm"/>
              </div>

              {/* PASSWORD */}
              <div>
                <label className="text-sm">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5" size={18} />
                  <Field
                    type="password"
                    name="password"
                    className="w-full pl-10 p-2 border rounded"
                  />
                </div>
                <ErrorMessage name="password" component="div" className="text-red-500 text-sm"/>
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label className="text-sm">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5" size={18} />
                  <Field
                    type="password"
                    name="confirmPassword"
                    className="w-full pl-10 p-2 border rounded"
                  />
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-sm"/>
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-2 rounded"
              >
                Register
              </button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  className="text-blue-500 cursor-pointer"
                >
                  Login
                </span>
              </div>

            </Form>
          )}
        </Formik>
      </div>

      {/* ✅ SHOW UPLOADED IMAGE */}
      {image && (
        <img
          src={`http://localhost:3500/uploadedimages/${image}`}
          alt="Uploaded"
          className="mt-6 w-24 h-24 rounded-full"
        />
      )}
    </div>
  );
}