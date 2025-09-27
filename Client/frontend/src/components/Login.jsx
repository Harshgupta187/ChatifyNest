import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice.js";
import { BASE_URL } from "..";
import { connectSocket } from "../utils/socket.js";

const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      // ✅ Save token in localStorage (if provided by backend)
      if (res.data?.token) {
        localStorage.setItem("token", res.data.token);
      }

      // ✅ Update Redux auth state
      dispatch(setAuthUser(res.data));

      // ✅ Connect socket immediately after login
      if (res.data?._id) {
        connectSocket(res.data._id);
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed!");
      console.log("Login Error:", error);
    } finally {
      setLoading(false);
      setUser({ username: "", password: "" });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-xl rounded-2xl">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          Welcome Back 👋
        </h1>

        <form onSubmit={onSubmitHandler} className="mt-6 space-y-4">
          {/* Username */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Username
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className="w-full px-3 border border-gray-300 h-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="text"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 font-medium text-gray-600">
              Password
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-3 border border-gray-300 h-11 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Sign up link */}
          <p className="text-center text-gray-500">
            Don't have an account?{" "}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign up
            </Link>
          </p>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 font-semibold text-white transition bg-blue-500 shadow-md hover:bg-blue-600 rounded-xl disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
