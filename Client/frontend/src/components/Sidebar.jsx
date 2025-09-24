import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { useSelector , useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/MessageSlice';

function Sidebar() {
  const [search, setSearch] = useState("")

  const {otherUsers} = useSelector(store => store.user);
  const dispatch = useDispatch()
  const navigate = useNavigate();
  
  const logoutHandler = async()=>{
    try {
      const res = await axios.get('http://localhost:5000/api/v1/user/logout', { withCredentials: true })
      navigate("/login");
      toast.success(res.data.message);

      // ✅ reset to empty arrays instead of null
      dispatch(setAuthUser(null));
      dispatch(setMessages([]));
      dispatch(setOtherUsers([]));
      dispatch(setSelectedUser(null));
    } catch (error) {
      console.log(error)
    }
  }

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (!search.trim()) {
      return; // ✅ don't modify list if search is empty
    }

    const conversationUser = otherUsers?.find((user) =>
      user.fullName.toLowerCase().includes(search.toLowerCase())
    );

    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]))
    } else {
      toast.error("User Not found")
    }
  }
  
  return (
    <div className='flex flex-col p-4 border-r border-slate-500'>
      <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md input input-bordered"
          type="text"
          placeholder='Search...'
        />
        <button type='submit' className='h-10 text-white rounded-r-none btn bg-zinc-700'>
          <BiSearchAlt2 className='w-6 h-6 outline-none'/>
        </button>
      </form>
      <div className='px-3 divider'></div>
      <OtherUsers/>
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
      </div>
    </div>
  )
}

export default Sidebar
