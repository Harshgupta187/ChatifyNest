import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

// props = {user}
const OtherUser =(props) => {
  const user = props.user;
  
  const dispatch = useDispatch();

  const {selectedUser , onlineUsers} = useSelector(store => store.user)

  const isOnline = onlineUsers.includes(user._id);
  
  const selectedUserHandler = () =>{
    dispatch(setSelectedUser(user))
  };
  
  return (
    <div>
  <div
    onClick={() => selectedUserHandler(user)}
    className={`${
      selectedUser?._id === user?._id
        ? "bg-zinc-200 text-black shadow-md"
        : "text-white"
    } flex items-center gap-4 p-3 rounded-xl cursor-pointer transition-all duration-200 hover:bg-zinc-200 hover:text-black`}
  >
    {/* Avatar */}
    <div className={`avatar ${isOnline ? "online" : ""}`}>
      <div className="w-12 h-12 overflow-hidden rounded-full ring-2 ring-zinc-300">
        <img
          src={user?.profilePhoto}
          alt="user-profile"
          className="object-cover w-full h-full"
        />
      </div>
    </div>

    {/* User Info */}
    <div className="flex flex-col flex-1">
      <div className="flex justify-between gap-2">
        <p className="text-base font-semibold">{user?.fullName}</p>
      </div>
    </div>
  </div>

  {/* Divider */}
  <div className="h-[1px] bg-zinc-700 opacity-30 my-2"></div>
</div>

  )
}

export default OtherUser