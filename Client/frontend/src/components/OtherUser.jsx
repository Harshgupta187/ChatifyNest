import { useDispatch,useSelector } from "react-redux";
import { setSelectedUser } from '../redux/userSlice.js';

const OtherUser = ({ user }) => {
    const dispatch = useDispatch();
    const {selectedUser, onlineUsers} = useSelector(store=>store.user);
    const isOnline = onlineUsers?.includes(user._id);
    const isSelected = selectedUser?._id === user?._id;
    
    const selectedUserHandler = (user) => {
        dispatch(setSelectedUser(user));
    }
    
    return (
        <>
            <div 
                onClick={() => selectedUserHandler(user)} 
                className={`group relative flex gap-3 items-center mx-2 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected 
                        ? 'bg-blue-100 text-blue-900 shadow-md transform scale-[1.02]' 
                        : 'text-white hover:bg-gray-700 hover:shadow-sm hover:transform hover:scale-[1.01]'
                }`}
            >
                {/* Selection indicator */}
                {isSelected && (
                    <div className='absolute left-0 w-1 h-8 transform -translate-y-1/2 bg-blue-500 rounded-r-full top-1/2'></div>
                )}
                
                {/* Avatar with online indicator */}
                <div className={`relative flex-shrink-0 avatar ${isOnline ? 'online' : ''}`}>
                    <div className={`w-12 h-12 rounded-full transition-all duration-200 ${
                        isSelected 
                            ? 'ring-2 ring-blue-300 shadow-md' 
                            : 'ring-2 ring-gray-600 group-hover:ring-blue-400'
                    }`}>
                        <img 
                            src={user?.profilePhoto} 
                            alt="user-profile" 
                            className="object-cover w-full h-full rounded-full"
                        />
                    </div>
                    {/* Online status dot */}
                    <div className={`absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                        isOnline 
                            ? 'bg-green-500 animate-pulse' 
                            : 'bg-gray-400'
                    } ${
                        isSelected ? 'border-blue-100' : 'border-gray-800'
                    }`}></div>
                </div>
                
                {/* User info */}
                <div className='flex flex-col flex-1 min-w-0'>
                    <p className={`font-medium truncate transition-colors duration-200 ${
                        isSelected ? 'text-blue-900' : 'text-white group-hover:text-gray-100'
                    }`}>
                        {user?.fullName}
                    </p>
                    <p className={`text-xs font-medium transition-colors duration-200 ${
                        isSelected 
                            ? isOnline ? 'text-green-600' : 'text-blue-600'
                            : isOnline ? 'text-green-400' : 'text-gray-400'
                    }`}>
                        {isOnline ? '🟢 Online' : '⚫ Offline'}
                    </p>
                </div>
                
                {/* Chevron indicator */}
                <div className={`transition-all duration-200 ${
                    isSelected ? 'opacity-100 text-blue-600' : 'opacity-0 group-hover:opacity-50 text-gray-400'
                }`}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
                    </svg>
                </div>
            </div>
            
            {/* Divider */}
            <div className={`h-px mx-4 my-1 transition-opacity duration-200 ${
                isSelected ? 'bg-blue-200 opacity-30' : 'bg-gray-600 opacity-50'
            }`}></div>
        </>
    )
}

export default OtherUser