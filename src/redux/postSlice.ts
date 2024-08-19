import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define Comment interface
export interface Comment {
  _id: string;
  text: string;
  author: string;
}

// Define Author interface
export interface Author {
  _id: string;
  username: string;
  profilePicture: string;
}

// Define Post interface
export interface Post {
  _id: string;
  author: Author;
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
}

// Define initial state type
interface PostState {
  posts: Post[];
  selectedPost: Post | null;
}

const initialState: PostState = {
  posts: [],
  selectedPost: null,
};

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    setPosts: (state, action: PayloadAction<Post[]>) => {
      state.posts = action.payload;
    },
    setSelectedPost: (state, action: PayloadAction<Post | null>) => {
      state.selectedPost = action.payload;
    },
    resetState: (state) => {
      state.posts = [];
      state.selectedPost = null;
    },
  },
});

// Dispatch resetState when logging out
export const { setPosts, setSelectedPost, resetState } = postSlice.actions;
export default postSlice.reducer;
