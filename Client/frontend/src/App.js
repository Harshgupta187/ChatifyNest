import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client"

import { setSocket } from './redux/SocketSlice.js';
import { setOnlineUsers } from './redux/userSlice';


// ✅ Add errorElement to handle unmatched routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: (
      <h1 className="mt-10 text-3xl font-bold text-center text-red-600">
        404 - Page Not Found
      </h1>
    ),
  },
  {
    path: "/register",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

function App() {
  
  const dispatch = useDispatch()
  
  const{authUser} = useSelector(store => store.user)
  const {socket} = useSelector(store=>store.socket);
  
  useEffect(() =>{
    if(authUser){
      const socketIo = io('http://localhost:5000' , {
        query: {userId:authUser._id}
      });
      dispatch(setSocket(socketIo))
      
      socketIo.on('getOnlineUsers' , (onlineUserStatus)=>{
       dispatch(setOnlineUsers(onlineUserStatus)) 
      });
      return () => socketIo.close();
    }
    else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [authUser]);

  
  
  return (
    <div className="flex items-center justify-center h-screen p-4">
      <RouterProvider router={router} />
      
    </div>
  );
}

export default App;
