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

export interface PostProps {
  post: Post;
}
