import SendInput from './SendInput.jsx'
import Messages from "./Messages.jsx"
import { useSelector } from 'react-redux'


function MessageContainer() {
  const {selectedUser, authUser , onlineUsers} = useSelector(store => store.user)

  
  const isOnline = onlineUsers?.includes(selectedUser?._id);
   

  // useEffect(() =>{
  //   return ()=>dispatch(setSelectedUser)
  // }, [selectedUser]);
  
  return (
    <>
      {
          selectedUser !== null ? (
            <div className='md:min-w-[550px] flex flex-col'>
        <div className='flex items-center gap-2 text-white bg-zinc-800'>
          <div className={`avatar ${isOnline ? 'online' : ''}`}>
            <div className='w-12 rounded-full '>
              <img src={selectedUser?.profilePhoto} alt="user-profile" />
            </div>
          </div>
          <div className='flex flex-col flex-1'>
            <div className='flex justify-between gap-2'>
              <p>{selectedUser?.fullName}</p>
            </div>
          </div>
        </div>
        <Messages/>
        <SendInput/>
        </div>
        ) 
        
        : (
          <div className='md:min-w-[550px] flex flex-col justify-center' >
            <h1 className='text-4xl font-bold text-black'>Hi, {authUser?.fullName}</h1>
            <h1 className='text-2xl text-black'>
              "Let's start a conversation"
            </h1>
          </div>
         
        )
        
      }
    </>
    
  )
}

export default MessageContainer