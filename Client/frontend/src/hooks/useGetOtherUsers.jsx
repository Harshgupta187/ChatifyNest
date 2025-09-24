import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice'
import axios from "axios"; // assuming you have centralized axios

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    
    if (!authUser) return; // ✅ don't fetch until logged in

    const fetchOtherUsers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/user", { withCredentials: true });
        console.log("other users -> ",res);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchOtherUsers();
  }, []);


};

export default useGetOtherUsers;
