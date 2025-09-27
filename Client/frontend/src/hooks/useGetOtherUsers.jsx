import { useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setOtherUsers } from "../redux/userSlice.js";
import { BASE_URL } from "..";

const useGetOtherUsers = () => {
  const dispatch = useDispatch();
  const { authUser } = useSelector((state) => state.user); // get logged-in user

  useEffect(() => {
    const fetchOtherUsers = async () => {
      try {
        const token = authUser?.token || localStorage.getItem("token"); // make sure token is available
        if (!token) return console.warn("No token found, skipping fetch.");

        const res = await axios.get(`${BASE_URL}/api/v1/user`, {
          headers: {
            Authorization: `Bearer ${token}`, // attach token
          },
          withCredentials: true, // just in case backend uses cookies
        });

        console.log("other users -> ", res.data);
        dispatch(setOtherUsers(res.data));
      } catch (error) {
        console.error("Failed to fetch other users", error);
      }
    };

    fetchOtherUsers();
  }, [authUser, dispatch]); // refetch if authUser changes
};

export default useGetOtherUsers;
