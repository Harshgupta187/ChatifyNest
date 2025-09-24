import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/MessageSlice";
import { getSocket } from "../redux/socketInstance.js";

const useGetRealTimeMessage = () => {
  const socket = getSocket();
  const { messages } = useSelector(store => store.message);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!socket) return;
    socket.on("newMessages", (newMess) => {
      dispatch(setMessages([...messages, newMess]));
    });

    return () => socket.off("newMessages");
  }, [messages]);
};

export default useGetRealTimeMessage;
