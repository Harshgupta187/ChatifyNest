import { createBrowserRouter, RouterProvider } from "react-router-dom";

import HomePage from "./components/HomePage.jsx";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

// ✅ Add errorElement to handle unmatched routes
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: (
      <h1 className="text-3xl font-bold text-center mt-10 text-red-600">
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
  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
