import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { useSelector , useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

function Sidebar() {
  const [search, setSearch] = useState("")

  const {otherUsers} = useSelector(store => store.user);

  const dispatch = useDispatch()
  
  
  const navigate = useNavigate();
  const logoutHandler = async()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/v1/user/logout')
      
      toast.success(res.data.message)
      dispatch(setAuthUser(null));// it will remove the green online status
      navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase())) 

    if(conversationUser) {
      dispatch(setOtherUsers([conversationUser]))
    }
    else{
      toast.error("User Not found")
    }
    
  }
  
  return (
    <div className='flex flex-col p-4 border-r border-slate-500'>
      <form onSubmit={searchSubmitHandler} action="" className= "flex items-center gap-2">
        <input value={search} onChange={(e) => setSearch(e.target.value)} classname="rounded-md input input-bordered " type="text" placeholder='Search...' />
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