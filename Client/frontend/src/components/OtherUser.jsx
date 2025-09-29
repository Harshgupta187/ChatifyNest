import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice.js';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const { selectedUser, onlineUsers } = useSelector(store => store.user);
    const isOnline = onlineUsers?.includes(user._id);

    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }

    return (
        <>
            <div 
                onClick={() => selectedUserHandler(user)} 
                className={`flex gap-3 items-center p-3 rounded-lg cursor-pointer transition-all duration-200 
                ${selectedUser?._id === user?._id 
                    ? 'bg-zinc-200 text-black shadow-md' 
                    : 'text-white hover:bg-zinc-200 hover:text-black'}`}>
                
                <div className={`avatar ${isOnline ? 'online' : ''}`}>
                    <div className="w-12 h-12 rounded-full ring-2 ring-gray-500">
                        <img src={user?.profilePhoto} alt="user-profile" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <p className="font-medium">{user?.fullName}</p>
                </div>
            </div>
            <div className="h-[1px] bg-gray-600 my-1"></div>
        </>
    )
}

export default OtherUser
