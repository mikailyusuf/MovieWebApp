import { ChakraProvider } from "@chakra-ui/react";
import HomePage from "./routes/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./routes/Login";
import Signup from "./routes/Signup";
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
