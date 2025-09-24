import React , {useState}from 'react'
import { Link , useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux";
import { setAuthUser } from '../redux/userSlice';


const Login = () => {

  const [user, setUser] =useState({ 
    username: "" ,
    password: "", 
  
  })
  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  const onSubmitHandler = async (e) =>{
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/v1/user/login', user, {
        headers:{
          'Content-Type': "application/json"
        }, 
        withCredentials: true
      })
      dispatch(setAuthUser(res.data)); // ✅ save logged-in user
      navigate("/"); // ✅ redirect after login
    }
    catch (error) {
      toast.error(error.response.data.message)
      console.log(error)
    }
    setUser({
      
      username: "" ,
      password: "",
      
    })
  }

  return (
    <div className="mx-auto min-w-96">
      <div className='w-full p-6 bg-black border border-gray-100 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10'>
        <h1 className='text-3xl font-bold text-center'>Login</h1>
        <form onSubmit={onSubmitHandler} action="">
          
          <div>
            <label className='p-2 label'>
              <span className='text-base label-text'>Username</span>
            </label>
            <input
              value={user.username}
              onChange={(e) => setUser({...user, username:e.target.value})}
              className='w-full h-10 input input-bordered'
              type="text"
              placeholder='Username' />
          </div>
          <div>
            <label className='p-2 label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}

              className='w-full h-10 input input-bordered'
              type="password"
              placeholder='Password' />
          </div>
          
          
          <p className='my-2 text-center'>Don't have an account? <Link to="/register"> Signup </Link></p>
          <div>
            <button type='submit' className='mt-2 border btn btn-block btn-sm border-slate-700'>Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login