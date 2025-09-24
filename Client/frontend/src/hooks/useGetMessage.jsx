import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/MessageSlice";

const useGetMessage = () => {
  const dispatch = useDispatch();
  const { selectedUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (!selectedUser?._id) return; // ✅ Don't fetch if no user is selected

    const fetchMessages = async () => {
      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(
          `http://localhost:5000/api/v1/message/${selectedUser._id}`
        );
        dispatch(setMessages(res.data || []));
      } catch (error) {
        console.error("❌ Failed to fetch messages:", error);
      }
    };

    fetchMessages();
  }, [selectedUser, dispatch]); // ✅ added dispatch to deps
};

export default useGetMessage;
