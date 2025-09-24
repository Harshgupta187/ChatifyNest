import React from 'react'
import OtherUser from './OtherUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

function OtherUsers() {
  useGetOtherUsers()
  const { otherUsers } = useSelector(store => store.user)

  if (!otherUsers || otherUsers.length === 0) {
    return <p className="text-center text-gray-500">No users found</p>
  }

  return (
    <div className="flex-1 overflow-auto">
      {otherUsers.map((user) => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  )
}

export default OtherUsers
