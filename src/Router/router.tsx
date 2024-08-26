import ChatPage from "@/Pages/Chat/ChatPage";
import Home from "@/Pages/Home";
import Main from "@/Pages/Main";
import EditProfile from "@/Pages/Profile/EditProfile";
import Profile from "@/Pages/Profile/Profile";
import Suggestions from "@/Pages/RightSide/Suggestions";
import Trends from "@/Pages/RightSide/Trends";
import Login from "@/Pages/User/Login";
import SignUp from "@/Pages/User/SignUp";
import ProtectedRoutes from "@/ProtectedRoute/ProtectedRoute";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoutes>
        <Main></Main>
      </ProtectedRoutes>
    ),
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoutes>
            <Home />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile/:id",
        element: (
          <ProtectedRoutes>
            <Profile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/profile/edit",
        element: (
          <ProtectedRoutes>
            <EditProfile />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/suggestions",
        element: (
          <ProtectedRoutes>
            <Suggestions />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/trends",
        element: (
          <ProtectedRoutes>
            <Trends />
          </ProtectedRoutes>
        ),
      },
      {
        path: "/chat",
        element: (
          <ProtectedRoutes>
            <ChatPage />
          </ProtectedRoutes>
        ),
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
