import { useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";
import { BASE_URL } from "..";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${BASE_URL}/api/v1/user/other-users`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("Failed to fetch other users:", error.response?.data || error.message);
      }
    };

    fetchOtherUsers();
  }, [dispatch]);
};

export default useGetOtherUsers;
