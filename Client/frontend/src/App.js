import Signup from './components/Signup.jsx';
import './App.css';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from './components/HomePage.jsx';
import Login from './components/Login.jsx';
import { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { setOnlineUsers } from './redux/userSlice.js';
import { connectSocket, disconnectSocket, getSocket } from './utils/socket.js';

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },
]);

function App() {
  const { authUser } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser?._id) {
      const socket = connectSocket(authUser._id);

      socket.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => disconnectSocket();
    } else {
      disconnectSocket();
    }
  }, [authUser]);

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
