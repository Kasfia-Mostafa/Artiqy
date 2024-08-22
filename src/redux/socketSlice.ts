/* eslint-disable @typescript-eslint/no-explicit-any */
// socketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Socket } from "socket.io-client";

// Define the interface for socket state
interface SocketState {
  isConnected: boolean;
  socket: Socket | null; 
}

// Define the initial state
const initialState: SocketState = {
  isConnected: false,
  socket: null, 
};

// Create the socket slice
const socketSlice = createSlice({
  name: "socketio",
  initialState,
  reducers: {
    // Action to set the connection status
    setConnectionStatus: (state, action: PayloadAction<boolean>) => {
      state.isConnected = action.payload;
    },
    // Action to set the socket instance
    setSocket: (state, action: PayloadAction<Socket | null>) => {
     
      state.socket = action.payload as any; 
    },
  },
});

// Export the actions and reducer
export const { setConnectionStatus, setSocket } = socketSlice.actions;
export default socketSlice.reducer;
