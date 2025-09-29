import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice.js';
import { BASE_URL } from '..';


const Login = () => {
  const [user, setUser] = useState({ username: "", password: "" });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}/api/v1/user/login`, user, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true // ✅ include cookies
      });

      navigate("/");

      // ✅ save user in Redux
      dispatch(setAuthUser(res.data));


      toast.success("Logged in successfully!");
      
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      console.log(error);
    }

    setUser({ username: "", password: "" });
  };

  return (
    <div className="mx-auto min-w-96">
      <div className='w-full p-6 bg-gray-400 border border-gray-100 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10'>
        <h1 className='mb-4 text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className='mb-4'>
            <label className='p-2 label'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              className='w-full h-10 input input-bordered'
              type="text"
              placeholder='Username'
              required
            />
          </div>

          <div className='mb-4'>
            <label className='p-2 label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className='w-full h-10 input input-bordered'
              type="password"
              placeholder='Password'
              required
            />
          </div>

          <p className='my-2 text-center'>
            Don't have an account? <Link to="/signup" className="text-blue-500 hover:underline">Signup</Link>
          </p>

          <button
            type="submit"
            className='w-full mt-4 shadow-md btn btn-primary hover:shadow-lg'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
