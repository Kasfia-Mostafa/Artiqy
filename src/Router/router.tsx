import ChatPage from "@/Pages/Chat/ChatPage";
import Home from "@/Pages/Home";
import Main from "@/Pages/Main";
import EditProfile from "@/Pages/Profile/EditProfile";
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
        path: "/profile/edit",
        element: <EditProfile/>,
      },
      {
        path: "/suggestions",
        element: <Suggestions/>,
      },
    {
      path: "/chat",
      element: <ChatPage/>,
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
