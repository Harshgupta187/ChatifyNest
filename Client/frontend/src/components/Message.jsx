import React, {useEffect, useRef } from 'react'
import { useSelector } from 'react-redux';


function Message({message}) {
    const scroll = useRef();

    useEffect(() =>{
        scroll.current?.scrollIntoView({behavior:"smooth"});
    },[message]);

    const {authUser , selectedUser} = useSelector(store => store.user)


    
  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' :'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt=" chat bubble component" src={message?.senderId === authUser?._id ? authUser?.profilePhoto :selectedUser?.profilePhoto }/>
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs text-white opacity-50">12:45</time>
            </div>
            <div className={` chat-bubble ${message?.senderId !== authUser?._id ? 'bg-gray-200 text-black' : ''} `} >{message?.message}</div>
        </div>
  )
}

export default Message