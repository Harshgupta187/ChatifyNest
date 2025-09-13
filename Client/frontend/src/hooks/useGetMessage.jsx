import React, { useEffect } from 'react'
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/MessageSlice';


const useGetMessage =() => {
  const  dispatch = useDispatch();

  const {selectedUser} = useSelector(store => store.user)

  useEffect(()=>{
    const fetchMessages = async ()=>{
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`http://localhost:5000/api/v1/user/${selectedUser?._id}`)
        dispatch(setMessages(res.data))
        
      } catch (error) {
        
      }
    }
    fetchMessages();
  }, [selectedUser])
}

export default useGetMessage