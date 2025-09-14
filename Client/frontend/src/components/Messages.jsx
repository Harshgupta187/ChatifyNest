import React from 'react'
import Message from "./Message"
import useGetMessage from '../hooks/useGetMessage'; 
import { useSelector } from 'react-redux';
import useGetRealTimeMessage from '../hooks/useGetRealTimeMessage';

const Messages = () =>  {
  useGetMessage();
  useGetRealTimeMessage();
  const {messages}= useSelector(store => store.message)

  if(!messages) return ;
  return (
    <div className=''>
      {
        messages &&messages?.map((message) =>{
          return (
            <Message key={message._id} message= {message}/>
          )
        })
      }
    </div>
  )
}

export default Messages