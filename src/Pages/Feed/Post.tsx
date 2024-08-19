/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react";
import { toast } from "sonner";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { Bookmark, MessageCircle, Send } from "lucide-react";
import { setPosts, setSelectedPost } from "@/redux/postSlice";
import CommentDialog from "./CommentDialog";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";

// Define Comment interface
interface Comment {
  _id: string;
  text: string;
  author: string;
}

// Define Author interface
interface Author {
  _id: string;
  username: string;
  profilePicture: string;
}

// Define Post interface
interface Post {
  _id: string;
  author: Author;
  image: string;
  caption: string;
  likes: string[];
  comments: Comment[];
}

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  // Ensure that posts are typed as Post[]
  const posts: Post[] = useSelector((state: RootState) => state.post.posts);

  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(
    post.likes.includes(user?._id || "")
  );
  const [postLike, setPostLike] = useState<number>(post.likes.length);
  const [comment, setComment] = useState<Comment[]>(post.comments);

  console.log("User:", user);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axiosPublic.get(`/post/${post._id}/${action}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedLikes = liked ? postLike - 1 : postLike + 1;
        setPostLike(updatedLikes);
        setLiked(!liked);

        const updatedPostData = posts.map((p) =>
          p._id === post._id
            ? {
                ...p,
                likes: liked
                  ? p.likes.filter((id) => id !== user?._id)
                  : [...p.likes, user!._id],
              }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const commentHandler = async () => {
    try {
      const res = await axiosPublic.post(
        `/post/${post._id}/comment`,
        { text },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        const updatedCommentData = [...comment, res.data.comment];
        setComment(updatedCommentData);

        const updatedPostData = posts.map((p) =>
          p._id === post._id ? { ...p, comments: updatedCommentData } : p
        );

        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deletePostHandler = async () => {
    try {
      const res = await axiosPublic.delete(`/post/delete/${post._id}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        const updatedPostData = posts.filter(
          (postItem) => postItem._id !== post._id
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const bookmarkHandler = async () => {
    try {
      const res = await axiosPublic.get(`/post/${post._id}/bookmark`, {
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      className="flex flex-col w-full max-w-3xl gap-4 p-5 my-10
     border-slate-50 rounded-md
     bg-[#a5e4df] text-sky-900"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={post.author?.profilePicture} alt="post_image" />
            <AvatarFallback>
              <img
                className="size-10"
                src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                alt="user-male-circle"
              />
            </AvatarFallback>
          </Avatar>
          <div className="flex items-center gap-3">
            <h1 className="text-xl">{post.author?.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant="secondary">
                <span className="pr-1 text-sky-900">Author</span>
                <img
                  className="size-4"
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADzklEQVR4nO2Z3UtUQRTA960gqD8hKCOC6sHMsDLJytIy+0ayMtdt3Tuza0UkYmUR0ReGWiGmmHtmkyKrpyBfCtIIoi/qIcryY2eWeojopR6K8MTM+hW51+u9e/eysAcOXHbn43fmzMeZMy5XSlKSEkuiieBiylkn5YxTzt4RAa1EBHcEekMzR8rIb/mb/E+WGS7bSfmNRS4nhURCayhnP6lgOIH+JgLeSpXfE5bh7Kdswxn4zzdmUw5fY8AbViLYt0A4ODeh8IHexmmEw0ur8HTECA4vZZsJgS8daJ9OONyJFzwdm06dsm3bwCtFxzzC2UkqWCTu8GLUE4JyqJV9xQ1ci7BCKlgP5TBkFzj9zxuqrx4agU2W4AlnxxMGLWJoGI6ZG/kBWEA5/HHcAA5/fJHQ/KmPvoBqx+FFVP2cVZkwgF12GpwOK+HQMGUDqGBtToPTMW0z44GORMD5PrXjKu9BzCGHdDzAQmYM6EqEAXknqjF9XRlmewI65eDBlOC9fbdnEcG+2w2/rf2sgl9a6EH3s+bYHhDs+/jodlKhHBrthi99fBUzNpRjep4bi+/VxW8h+wXLtfvUrXh/HbOKNTX6G+tqjdXjMCTZdOGPfGEziIB+O+EJZ5h7+IiCz9EOojYYNF5XQL9k1Js6AbunzubGUwp+2fYKPPC21cwA+GMaQAS7Zyd8yf16XJJXhunr3VjS1WjSg3BHxwPsrpFGcrRDmF0eQM+ra4Y7Ln/dgplFXjX6W1rOWJiCENsA6R4jjciDR4JkbvPi3odXJu+0P4jZnkpVZ21VlVyQ5j3JGdVdxFRA32SN+D6249qjRxXQkg1u3MHO6ZbPP12jyi4vIejrvW5hGkKf7iKWoongakPbaBiwsD66IKXmnzmGZPD/kd3ZcT5qaEE57n/SZGHkYUiy6cKPTSVoMNrwzpsXogfSujK1PY4f4f1PmzBjo0f9t+vWxcRFpAGViDIeSux7dEVtixJ0xV6K7ufNWPGhDbN2k6h3zh63Bi+mGEqYCebkjrSy1D+6uGV0Kb9XHahEbcDCohUmgjmz4fT4xa0MKfKq7dMaPDMXTpu+0IQBN12qxcytXtxj8rCicbrQJPeVkiT7pV5L9rSKFJlUctoAIkI1LitCBBQQAd2JTi0SAd1+Ecy3BP+PIZylycSrSsDanNwlnKW5ki29Tji7bWt63c4HDirYi4Q9cNjxxKSFO+a4nJBoBmPiRz4i4Bfl7I3SGI98hMOPSTMNdot8KpXzl3IYHH5CbZnwmTUS2kU5wLBBA7KOj7OFjsKnJCWu5Je/llxZrtxv+7cAAAAASUVORK5CYII="
                ></img>
              </Badge>
            )}
          </div>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <MoreHorizontal className="cursor-pointer" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center bg-feed text-sky-900">
            {post.author._id !== user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer w-fit text-[#ED4956] font-bold"
              >
                Unfollow
              </Button>
            )}
            <Button
              variant="ghost"
              className="cursor-pointer mt-6 hover:bg-logo w-full hover:text-sky-900"
            >
              Add to favorites
            </Button>
            {user && user._id === post.author._id && (
              <Button
                onClick={deletePostHandler}
                variant="ghost"
                className="cursor-pointer hover:bg-logo w-full hover:text-sky-900"
              >
                Delete
              </Button>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <p className="py-2">{post.caption}</p>
      <img
        className="w-full max-h-fit object-fit rounded-md"
        // className='rounded-sm my-2 w-full aspect-square object-cover'
        src={post.image}
        alt="post_img"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <FaHeart
              onClick={likeOrDislikeHandler}
              size={24}
              className="cursor-pointer text-red-600"
            />
          ) : (
            <FaRegHeart
              onClick={likeOrDislikeHandler}
              size={22}
              className="cursor-pointer hover:text-gray-600"
            />
          )}

          <MessageCircle
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="cursor-pointer hover:text-gray-600"
          />
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>
        <Bookmark
          onClick={bookmarkHandler}
          className="cursor-pointer hover:text-gray-600"
        />
      </div>
      <span className="font-medium block mb-2">{postLike} likes</span>

      {comment.length > 0 && (
        <span
          onClick={() => {
            dispatch(setSelectedPost(post));
            setOpen(true);
          }}
          className="cursor-pointer text-sm text-gray-400"
        >
          View all {comment.length} comments
        </span>
      )}
      <CommentDialog open={open} setOpen={setOpen} />
      <div className="flex items-center justify-between">
        <Input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="outline-none text-sm w-full"
        />
        {text && (
          <span
            onClick={commentHandler}
            className="text-[#3BADF8] cursor-pointer"
          >
            Post
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
