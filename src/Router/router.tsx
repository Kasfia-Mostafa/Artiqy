import Home from "@/Pages/Home";
import Main from "@/Pages/Main";
import Profile from "@/Pages/Profile/Profile";
import Suggestions from "@/Pages/RightSide/Suggestions";
import Login from "@/Pages/User/Login";
import SignUp from "@/Pages/User/SignUp";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/profile/:id",
        element: <Profile/>,
      },
      {
        path: "/suggestions",
        element: <Suggestions/>,
      },
    ],
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
]);
