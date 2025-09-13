import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import loginimg from '../assets/login.png';

const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/users/login/", // custom backend login
        {
          username: form.username,
          password: form.password,
        }
      );

      // Successful login → store tokens
      localStorage.setItem("access_token", response.data.access);
      localStorage.setItem("refresh_token", response.data.refresh);
      localStorage.setItem("username", form.username); // <-- store username


      alert("Login successful!");
      navigate("/"); // redirect to home/dashboard
    } catch (err) {
      if (err.response && err.response.data) {
        const data = err.response.data;
        if (data.username) {
          setError(data.username); // user does not exist
        } else if (data.password) {
          setError(data.password); // wrong password
        } else {
          setError("Login failed. Try again.");
        }
      } else {
        setError("Login failed. Try again later.");
      }
    }
  };

  return (
    <main className="flex items-center justify-center min-h-[calc(100vh-16rem)] p-4 mt-28">
      <div className="w-full max-w-6xl bg-white overflow-hidden flex flex-col md:flex-row">
        {/* Left Side: Image */}
        <div className="w-full md:w-1/2">
          <img
            src={loginimg}
            alt="Bike"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-center text-[#1f526b] mb-10">
            Log in
          </h1>

          {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-gray-700 font-medium mb-1">
                User Name
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

            <button
              type="submit"
              className="w-full bg-[#1f526b] text-white py-3 rounded-xl font-semibold shadow-md hover:bg-[#153a4a] transition-colors duration-300"
            >
              Log in
            </button>
          </form>

          <p className="text-center mt-6 text-gray-700">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Login;
