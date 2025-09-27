import SendInput from './SendInput.jsx'
import Messages from './Messages.jsx';
import { useSelector } from "react-redux";

const MessageContainer = () => {
    const { selectedUser, authUser, onlineUsers } = useSelector(store => store.user);
    
    const isOnline = onlineUsers?.includes(selectedUser?._id);
   
    return (
        <>
            {
                selectedUser !== null ? (
                    <div className='md:min-w-[550px] flex flex-col bg-gray-50'>
                        <div className='flex items-center gap-3 px-4 py-4 border-b border-gray-100 shadow-sm bg-indigo-950'>
                            <div className={`avatar ${isOnline ? 'online' : ''}`}>
                                <div className='w-12 rounded-full shadow-sm ring-2 ring-blue-100'>
                                    <img src={selectedUser?.profilePhoto} alt="user-profile" />
                                </div>
                            </div>
                            <div className='flex flex-col flex-1'>
                                <p className='font-semibold text-yellow-400'>{selectedUser?.fullName}</p>
                                <p className={`text-sm ${isOnline ? 'text-green-600' : 'text-gray-500'}`}>
                                    {isOnline ? 'Online' : 'Offline'}
                                </p>
                            </div>
                        </div>
                        <Messages />
                        <SendInput />
                    </div>
                ) : (
                    <div className='md:min-w-[550px] flex flex-col justify-center items-center bg-gradient-to-br from-blue-50 to-indigo-100'>
                        <div className='p-8 text-center'>
                            <div className='flex items-center justify-center w-24 h-24 mx-auto mb-6 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-indigo-600'>
                                <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd"></path>
                                </svg>
                            </div>
                            <h1 className='mb-2 text-4xl font-bold text-gray-800'>Hi, {authUser?.fullName}! 👋</h1>
                            <h2 className='text-xl text-gray-600'>Select a chat to start messaging</h2>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default MessageContainer