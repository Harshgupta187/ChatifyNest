import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/MessageSlice";

const useGetRealTimeMessage = ()=>{
  const {socket} = useSelector(store => store.socket)
  const {messages} = useSelector(store=> store.message)
  const dispatch = useDispatch()
  useEffect(() =>{
    socket?.on("newMessages",(newMess) =>{
      dispatch(setMessages([...messages, newMess]));
    });
    return () => socket?.off("newMessage")
  },[setMessages , messages]);

}

export default useGetRealTimeMessage;