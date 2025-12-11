import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";

function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const validate = () => {
    let newErrors = {};
    if (!email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Enter a valid email";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        setMessage(data.message || "Login failed");
        return;
      }

      login({
        username: data.user.username,
        token: data.token      });

      navigate("/");
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <PageWrapper>
      {/* Your form code here */}
       <div className="w-screen h-144 flex justify-center items-center bg-gradient-to-r from-pink-100 via-blue-200 to-pink-100">
        <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-md transition duration-300">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center tracking-wide">
            Welcome Back
          </h2>

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`w-full px-4 py-3 mb-2 border ${
              errors.email ? "border-red-500" : "border-gray-300"
            } text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200`}
          />
          {errors.email && <p className="text-red-500 text-sm mb-3">{errors.email}</p>}

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`w-full px-4 py-3 mb-2 border ${
              errors.password ? "border-red-500" : "border-gray-300"
            } text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition duration-200`}
          />
          {errors.password && <p className="text-red-500 text-sm mb-4">{errors.password}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold p-3 rounded-lg hover:scale-105 hover:shadow-md transition duration-300"
          >
            Log In
          </button>

          {message && <p className="text-red-600 text-sm mt-4 text-center">{message}</p>}

          <p className="mt-5 text-sm text-gray-600 text-center">
            Don’t have an account?{" "}
            <a href="/signup" className="text-purple-700 font-semibold hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}

export default Login;


