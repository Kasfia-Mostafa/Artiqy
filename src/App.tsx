// App.tsx
import { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store"; 
import { io, Socket } from "socket.io-client"; 
import { router } from "./Router/router";
import { setConnectionStatus } from "./redux/socketSlice"; // Import the action

function App() {
  const { user } = useSelector((store: RootState) => store.auth);
  const isConnected = useSelector((store: RootState) => store.socketio.isConnected);
  const dispatch = useDispatch();

  useEffect(() => {
    let socketio: Socket | null = null; 

    if (user) {
      if (!isConnected) {
        // Establish a new socket connection
        socketio = io("http://localhost:5000", {
          query: { userId: user._id },
          transports: ["websocket"],
        });
        
        // Dispatch the connection status
        dispatch(setConnectionStatus(true));

        socketio.on("disconnect", () => {
          dispatch(setConnectionStatus(false)); // Update status on disconnect
        });

        return () => {
          if (socketio) {
            socketio.disconnect(); // Clean up socket connection
            dispatch(setConnectionStatus(false)); // Update status on cleanup
          }
        };
      }
    }
  }, [user, dispatch, isConnected]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
