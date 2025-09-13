import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';

// props = {user}
const OtherUser =(props) => {
  const user = props.user;
  
  const dispatch = useDispatch();

  const {selectedUser} = useSelector(store => store.user)
  
  const selectedUserHandler = () =>{
    dispatch(setSelectedUser(user))
  };
  
  return (
    <div>
      <div onClick={()=> selectedUserHandler(user)} className={`${selectedUser?._id === user?._id ? 'bg-zinc-200 text-black': 'text-white' } flex items-center gap-2 p-2 text-white hover:text-black rounded-sm cursor-pointer  hover:bg-zinc-200`}>
        <div className='avatar online'>
          <div className='w-12 rounded-full '>
            <img src={user?.profilePhoto} alt="user-profile" />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex justify-between gap-2 text-white'>
            <p>{user?.fullName}</p>
          </div>
        </div>
      </div>
      <div className='h-1 py-0 my-0 divider '></div>
    </div>
  )
}

export default OtherUser