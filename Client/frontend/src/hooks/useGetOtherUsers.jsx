import React, { useEffect } from 'react'
import axios from "axios";
import {useDispatch} from "react-redux"
import {setOtherUsers} from "../redux/userSlice";

function useGetOtherUsers() {
  const dispatch = useDispatch();
  useEffect(() =>{
    const fetchOtherUsers = async ()=>{
      //making a network call
      try {
        axios.defaults.withCredentials = true
        const res = await axios.get('http://localhost:5000/api/v1/user/');
        console.log(res)
        //
        dispatch(setOtherUsers(res.data))

      }
      catch (error) {
        console.log(error)
      }
    }
    fetchOtherUsers();
  },)
}

export default useGetOtherUsers