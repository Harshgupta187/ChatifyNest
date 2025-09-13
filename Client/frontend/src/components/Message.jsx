import React from 'react'

function Message({message}) {
  return (
    <div >
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img alt="Tailwind CSS chat bubble component" src=""/>
                </div>
            </div>
            <div className="chat-header">
                <time className="text-xs text-white opacity-50">12:45</time>
            </div>
            <div className='chat-bubble' >{message?.message}</div>
        </div>
  )
}

export default Message