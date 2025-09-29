import React, { useEffect, useRef } from 'react'
import { useSelector } from "react-redux";

const Message = ({ message }) => {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector(store => store.user);

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: "smooth" });
    }, [message]);

    const formattedTime = message?.createdAt
        ? new Date(message.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        : new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    return (
        <div ref={scroll} className={`chat ${message?.senderId === authUser?._id ? 'chat-end' : 'chat-start'} px-2`}>
            <div className="chat-image avatar">
                <div className="w-10 h-10 rounded-full ring-2 ring-zinc-600">
                    <img
                        alt="User avatar"
                        src={message?.senderId === authUser?._id ? authUser?.profilePhoto : selectedUser?.profilePhoto}
                    />
                </div>
            </div>
            <div className="mb-1 chat-header">
                <time className="text-[10px] text-gray-400">{formattedTime}</time>
            </div>
            <div className={`chat-bubble shadow-md ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : 'bg-blue-600 text-white'}`}>
                {message?.message}
            </div>
        </div>
    );
}

export default Message;
