export interface Comment {
  _id: string;
  text: string;
  author: string;
}

export interface Post {
  _id: string;
  author: {
    _id: string;
    username: string;
    profilePicture: string;
  };
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
}
