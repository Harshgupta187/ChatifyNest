import React from 'react'

const OtherUser =(props) => {
  const user = props.user;
  return (
    <div>
      <div className='flex items-center gap-2 p-2 text-white rounded-sm cursor-pointer hover:text-zinc-900 hover:bg-zinc-200'>
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