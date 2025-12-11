import React, { useState } from 'react';
import axios from 'axios';
import PageWrapper from "../components/PageWrapper";

const Signup = () => {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' }); // clear error when typing
  };

  const validateForm = () => {
    let newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.password.trim()) newErrors.password = 'Password is required';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    try {
      const res = await axios.post('http://localhost:5000/api/signup', form);
      setMessage(res.data.message || 'Signup successful');
      console.log('Sign Up successful');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <PageWrapper>
      <div className="w-screen h-144 flex justify-center items-center bg-gradient-to-r from-purple-200 via-red-200 to-purple-200 px-4">
        <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-md">
          <h2 className="text-3xl font-extrabold text-center text-pink-600 mb-8">Create Your Account</h2>
          <form onSubmit={handleSignup}>
            {/* Username */}
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={form.username}
              onChange={handleChange}
              className="w-full p-3 mb-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
            {errors.username && <p className="text-red-500 text-sm mb-4">{errors.username}</p>}

            {/* Email */}
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              className="w-full p-3 mb-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
            {errors.email && <p className="text-red-500 text-sm mb-4">{errors.email}</p>}

            {/* Password */}
            <input
              type="password"
              name="password"
              placeholder="Create Password"
              value={form.password}
              onChange={handleChange}
              className="w-full p-3 mb-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent"
            />
            {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

            {/* Button */}
            <button
              type="submit"
              className="w-full bg-pink-600 text-white p-3 rounded-md text-lg font-medium hover:bg-pink-700 transition-all"
            >
              Create Account
            </button>
          </form>

          {message && <p className="text-green-600 text-sm mt-4 text-center">{message}</p>}

          <p className="mt-6 text-center text-sm text-gray-700">
            Already have an account?{" "}
            <a href="/login" className="text-pink-600 font-semibold hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

export default Signup;
