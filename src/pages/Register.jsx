import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";
import regimg from '../assets/4.gif';


const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await register(form.username, form.email, form.password);
      alert("Registration successful! Please log in.");
      navigate("/login");
    } catch (err) {
      if (err.response && err.response.data) {
        // Extract DRF error messages
        const errors = err.response.data;
        let message = "";
        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            message += errors[key].join(" ") + " ";
          }
        }
        setError(message.trim());
      } else {
        setError("Registration failed. Try again.");
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-16rem)] p-4 mt-28">
      <div className="w-full max-w-7xl bg-white overflow-hidden flex flex-col md:flex-row-reverse">
        {/* Left Side: Registration Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h1 className="text-4xl font-bold text-center text-[#1f526b] mb-10">
            Register
          </h1>
          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                Full Name (Username)
              </label>
              <input
                type="text"
                id="username"
                value={form.username}
                onChange={(e) => setForm({ ...form, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-1">
                E-mail Address
              </label>
              <input
                type="email"
                id="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-700 font-medium mb-1">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-gray-700 font-medium mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirm-password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1f526b] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#153a4a] transition-colors duration-300"
            >
              Register
            </button>
          </form>

          <p className="text-sm text-center text-gray-600 mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>

        {/* Right Side: Image */}
        <div className="w-full md:w-1/2">
          <img
          src={regimg}
            alt="Register illustration"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;
