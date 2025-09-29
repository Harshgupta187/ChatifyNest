import { useState } from 'react'
import { BiSearchAlt2 } from "react-icons/bi";
import { HiLogout } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
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
    const [isSearching, setIsSearching] = useState(false);
    const { otherUsers, authUser } = useSelector(store => store.user);
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
        if (!search.trim()) return;
        
        setIsSearching(true);
        const conversationUser = otherUsers?.find((user) => 
            user.fullName.toLowerCase().includes(search.toLowerCase())
        );
        
        setTimeout(() => {
            if (conversationUser) {
                dispatch(setOtherUsers([conversationUser]));
                toast.success("User found!");
            } else {
                toast.error("User not found!");
            }
            setIsSearching(false);
        }, 500);
    }

    const clearSearch = () => {
        setSearch("");
        // Reset to show all users - you might want to call your hook again here
        // or dispatch to reset the otherUsers to the original list
    }
    
    return (
        <div className='flex flex-col h-full border-r border-gray-700 shadow-xl bg-gradient-to-b from-gray-800 to-gray-900'>
            {/* Header with user info */}
            <div className='p-4 bg-gray-800 border-b border-gray-700'>
                <div className='flex items-center gap-3 mb-4'>
                    <div className='flex items-center justify-center w-10 h-10 rounded-full shadow-lg bg-gradient-to-br from-blue-500 to-purple-600'>
                        <span className='text-lg font-bold text-white'>
                            {authUser?.fullName?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className='flex-1 min-w-0'>
                        <p className='font-semibold text-white truncate'>{authUser?.fullName}</p>
                        <p className='text-sm text-gray-400'>💬 Chats</p>
                    </div>
                </div>

                {/* Enhanced Search */}
                <form onSubmit={searchSubmitHandler} className='relative'>
                    <div className='relative'>
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className='w-full py-3 pl-10 pr-20 text-white placeholder-gray-400 transition-all duration-200 bg-gray-700 border border-gray-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent' 
                            type="text"
                            placeholder='Search conversations...'
                        />
                        
                        {/* Search Icon */}
                        <BiSearchAlt2 className='absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2'/>
                        
                        {/* Clear/Search Button */}
                        <div className='absolute flex gap-1 transform -translate-y-1/2 right-2 top-1/2'>
                            {search && (
                                <button 
                                    type='button'
                                    onClick={clearSearch}
                                    className='p-1.5 text-gray-400 hover:text-white hover:bg-gray-600 rounded-full transition-colors'
                                >
                                    <IoClose className='w-4 h-4'/>
                                </button>
                            )}
                            <button 
                                type='submit' 
                                disabled={!search.trim() || isSearching}
                                className={`p-1.5 rounded-full transition-all duration-200 ${
                                    search.trim() && !isSearching
                                        ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
                                        : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                }`}
                            >
                                {isSearching ? (
                                    <div className="w-4 h-4 border-2 border-white rounded-full border-t-transparent animate-spin"></div>
                                ) : (
                                    <BiSearchAlt2 className='w-4 h-4'/>
                                )}
                            </button>
                        </div>
                    </div>
                </form>
            </div>
            
            {/* Users List */}
            <div className='flex-1 overflow-hidden'>
                <div className='h-full overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent hover:scrollbar-thumb-gray-500'>
                    <OtherUsers/> 
                </div>
            </div>
            
            {/* Enhanced Logout Section */}
            <div className='p-4 bg-gray-800 border-t border-gray-700'>
                <button 
                    onClick={logoutHandler} 
                    className='group w-full flex items-center justify-center gap-3 py-3 px-4 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800 shadow-lg hover:shadow-xl font-medium'
                >
                    <HiLogout className='w-5 h-5 transition-transform group-hover:translate-x-1' />
                    Logout
                </button>
            </div>
        </div>
    )
}

export default Sidebar