import { useEffect } from 'react';
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from '../redux/userSlice.js';
import { BASE_URL } from '..';

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    const fetchOtherUsers = async () => {
      if (!authUser) {
        console.log("No auth user, skipping fetch.");
        return;
      }

      try {
        axios.defaults.withCredentials = true;
        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          withCredentials: true // ✅ send cookies
        });

        console.log("✅ other users -> ", res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("❌ Failed to fetch other users", error);
      }
    };

    fetchOtherUsers();
  }, [authUser]);
};

export default useGetOtherUsers;
