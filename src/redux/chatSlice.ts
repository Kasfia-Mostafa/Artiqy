import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure of a single message
interface Message {
  _id: string;         
  senderId: string;     
  receiverId: string;   
  message: string;    
  __v?: number;        
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
      state.messages = action.payload; 
      state.loading = false; 
      state.error = null; 
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload; 
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload; 
      state.loading = false; 
    },
  },
});

export const { setOnlineUsers, setMessages, setLoading, setError } = chatSlice.actions;
export default chatSlice.reducer;
