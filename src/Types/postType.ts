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
  likes?: number;
  comments?: number;
  createdAt?: Date;
}


// Assuming this is in your postType.ts or wherever your User type is defined

export interface User {
  _id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  phone?: string;
  role: string;
  address?: string;
  profilePicture?: string;
  coverPicture?: string;
  about?: string;
  livesIn?: string;
  worksAt?: string;
  relationship?: string;
  followers: string[]; // or an array of user IDs
  following: string[]; // or an array of user IDs
  bio?: string; // optional property
  posts?: Post[]; // include posts if this is relevant
  bookmarks?: Post[];
}




