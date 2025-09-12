import React from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"

function Sidebar() {
  const navigate = useNavigate();
  const logoutHandler = async()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/v1/user/logout')
      
      toast.success(res.data.message)
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='flex flex-col p-4 border-r border-slate-500'>
      <form action="" className= "flex items-center gap-2">
        <input classname="rounded-md input input-bordered " type="text" placeholder='Search...' />
        <button type='submit' className='h-10 text-white rounded-r-none btn bg-zinc-700'>
          <BiSearchAlt2 className='w-6 h-6 outline-none'/>
        </button>
      </form>
      <div className='px-3 divider'></div>
      <OtherUsers/>
      <div className='mt-2'>
        <button onClick={logoutHandler} type='submit' className='btn btn-sm'>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar