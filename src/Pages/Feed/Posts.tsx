/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Post from "./Post";

const Posts: React.FC = () => {
  
  const { posts } = useSelector((store: RootState) => store.post);

  if (posts.length === 0) {
    return <div>No posts available.</div>;
  }

  return (
    <div>
      {posts.map((post: any) => (
        <Post post={post} key={post._id} />
      ))}
    </div>
  );
};

export default Posts;
