/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { io, Socket } from "socket.io-client";
import { setSocket } from "@/redux/socketSlice"; 
import { RootState } from "@/redux/store";
import { router } from "./Router/router";
import { setOnlineUsers } from "./redux/chatSlice";
import { setLikeNotification } from "./redux/rtnSlice";

function App() {
  const { user } = useSelector((store: RootState) => store.auth);
  const socket = useSelector((store: RootState) => store.socketio.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    let socketio: Socket | null = null;
  
    if (user) {
      socketio = io("http://localhost:5000", {
        query: { userId: user?._id },
        transports: ["websocket"],
      });
  
      socketio.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
      });
  
      socketio.on("getOnlineUsers", (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
  
      socketio.on("notification", (notification) => {
        dispatch(setLikeNotification(notification));
      });
  
      dispatch(setSocket(socketio));
  
      return () => {
        if (socketio) {
          socketio.off("getOnlineUsers");
          socketio.off("notification");
          socketio.close();
        }
        dispatch(setSocket(null));
      };
    } else if (socket) {
      socket.off("getOnlineUsers");
      socket.off("notification");
      socket.close();
      dispatch(setSocket(null));
    }
  }, [user, dispatch]);
  

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
