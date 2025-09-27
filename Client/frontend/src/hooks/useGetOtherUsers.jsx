import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice.js';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector(store => store.user);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      if (!authUser) return; // authUser must exist

      const token = localStorage.getItem("token"); // ✅ get JWT token
      if (!token) {
        console.log("No token found, skipping fetch.");
        return;
      }

      try {
        const res = await axios.get(`${BASE_URL}/api/v1/user/other-users`, {
          headers: { Authorization: `Bearer ${token}` } // send token
        });

        console.log("✅ Other users -> ", res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("❌ Failed to fetch other users", error.response?.data || error.message);
      }
    };

    fetchOtherUsers();
  }, [authUser, dispatch]);
};

export default useGetOtherUsers;
