import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./components/HomePage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { initSocket, closeSocket } from "./redux/socketInstance.js"; // ✅ singleton socket
import { setOnlineUsers } from "./redux/userSlice";

// ✅ Router configuration
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
  const dispatch = useDispatch();
  const { authUser } = useSelector((store) => store.user);

  useEffect(() => {
    if (authUser) {
      // ✅ create or reuse socket
      const socket = initSocket(authUser._id);

      socket.on("getOnlineUsers", (onlineUserStatus) => {
        dispatch(setOnlineUsers(onlineUserStatus));
      });

      return () => {
        socket.off("getOnlineUsers");
        closeSocket();
      };
    } else {
      // ✅ cleanup if user logs out
      closeSocket();
    }
  }, [authUser, dispatch]);

  return (
    <div className="flex items-center justify-center h-screen p-4">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
