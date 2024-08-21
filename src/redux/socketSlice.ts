// socketSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the interface for socket state
interface SocketState {
  isConnected: boolean;
}

// Define the initial state
const initialState: SocketState = {
  isConnected: false, 
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
  },
});

// Export the action and reducer
export const { setConnectionStatus } = socketSlice.actions;
export default socketSlice.reducer;
