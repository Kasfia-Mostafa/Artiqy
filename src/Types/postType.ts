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

export interface User {
  _id: string;
  username: string;
  email: string;
  profilePicture?: string;
  followers: string[]; 
  following: string[]; 
  bio?: string;
  posts?: Post[]; 
  bookmarks?: Post[]; 
  gender?: string;

}



