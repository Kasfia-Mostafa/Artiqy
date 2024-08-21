import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a single message
interface Message {
  _id: string;          // Unique identifier for the message
  senderId: string;     // ID of the user who sent the message
  receiverId: string;   // ID of the user who received the message
  message: string;      // The content of the message
  __v?: number;         // Optional version key
}

// Define the structure of the chat state
interface ChatState {
  onlineUsers: string[];
  messages: Message[];
  loading: boolean; 
  error: string | null; 
}

const initialState: ChatState = {
  onlineUsers: [],
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setOnlineUsers: (state, action: PayloadAction<string[]>) => {
      state.onlineUsers = action.payload;
    },
    setMessages: (state, action: PayloadAction<Message[]>) => {
      state.messages = action.payload; // Update messages
      state.loading = false; // Set loading to false after messages are fetched
      state.error = null; // Clear any previous errors
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; // Update loading state
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; // Update error state
      state.loading = false; // Set loading to false if there's an error
    },
  },
});

export const { setOnlineUsers, setMessages, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;
