import React, { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice.js';
import { setMessages } from '../redux/MessageSlice.js';
import { BASE_URL } from '..';

const Sidebar = () => {
    const [search, setSearch] = useState("");
    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/api/v1/user/logout`);
            navigate("/login");
            toast.success(res.data.message);
            dispatch(setAuthUser(null));
            dispatch(setMessages(null));
            dispatch(setOtherUsers(null));
            dispatch(setSelectedUser(null));
        } catch (error) {
            console.log(error);
        }
    }

    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) =>
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }

    return (
        <div className="flex flex-col p-4 bg-gray-800 border-r border-gray-600 rounded-l-2xl">
            <form onSubmit={searchSubmitHandler} className="flex items-center gap-2">
                <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full px-3 py-2 text-white bg-gray-700 rounded-lg input input-bordered focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Search..."
                />
                <button type="submit" className="text-white bg-blue-600 btn btn-sm hover:bg-blue-500">
                    <BiSearchAlt2 className="w-5 h-5" />
                </button>
            </form>

            <div className="my-2 divider"></div>
            <OtherUsers />
            <button 
                onClick={logoutHandler} 
                className="mt-3 text-white transition-all bg-red-600 btn btn-sm hover:bg-red-500">
                Logout
            </button>
        </div>
    )
}

export default Sidebar
