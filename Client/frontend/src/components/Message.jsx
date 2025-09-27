import { useEffect, useRef } from 'react'
import {useSelector} from "react-redux";

const Message = ({message}) => {
    const scroll = useRef();
    const {authUser,selectedUser} = useSelector(store=>store.user);

    useEffect(()=>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);

    // Function to format timestamp
    const formatTimestamp = (timestamp) => {
        if (!timestamp) return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        
        const messageDate = new Date(timestamp);
        const now = new Date();
        const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60));
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInMinutes < 1) {
            return 'Just now';
        } else if (diffInMinutes < 60) {
            return `${diffInMinutes}m ago`;
        } else if (diffInHours < 24) {
            return `${diffInHours}h ago`;
        } else if (diffInDays === 1) {
            return 'Yesterday';
        } else if (diffInDays < 7) {
            return `${diffInDays}d ago`;
        } else {
            return messageDate.toLocaleDateString();
        }
    };
    
    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full shadow-sm ring-2 ring-blue-100">
                    <img alt="avatar" src={message?.senderId === authUser?._id ? authUser?.profilePhoto  : selectedUser?.profilePhoto } />
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs text-gray-500 opacity-70">
                    {formatTimestamp(message?.createdAt)}
                </time>
            </div>
            <div className={`chat-bubble shadow-md ${
                message?.senderId !== authUser?._id 
                    ? 'bg-white text-gray-800 border border-gray-200' 
                    : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
            }`}>
                {message?.message}
            </div>
        </div>
    )
}

export default Message