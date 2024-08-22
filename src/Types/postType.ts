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

export interface PostProps {
  post: Post;
}

export interface UserProfile {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  posts: Post[];
  bookmarks: Post[];
  followers: string[];
  following: string[];
  bio?: string;
}
export interface Post {
  _id: string;
  caption: string;
  image?: string;
  author: string;
  likes?: string[]; 
  comments?: string[];
  createdAt?: Date;
}

export interface SelectedUser {
  _id: string;
  profilePicture?: string;
  username: string;
}

export interface Message {
  _id: string;          // Unique identifier for the message
  senderId: string;     // ID of the user who sent the message
  receiverId: string;   // ID of the user who received the message
  message: string;      // The content of the message
  __v?: number;         // Optional version key (usually for versioning in MongoDB)
}

