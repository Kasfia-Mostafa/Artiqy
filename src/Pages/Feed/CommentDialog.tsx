/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MoreHorizontal } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Comment from "./Comment";
import { Button } from "@/components/ui/button";
import { Types } from "mongoose";
import { Input } from "@/components/ui/input";
import useAxiosPublic from "../Hooks/useAxiosPublic";

// Interface for a comment
interface Comment {
  _id: Types.ObjectId;
  text: string;
  author: {
    _id: Types.ObjectId;
    username: string;
    profilePicture?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Interface for the selected post
interface SelectedPost {
  _id: Types.ObjectId;
  image: string;
  author: {
    _id: Types.ObjectId;
    username: string;
    profilePicture?: string;
  };
  comments: Comment[];
}

// Props for the CommentDialog component
interface CommentDialogProps {
  open: boolean; // Whether the dialog is open
  setOpen: (open: boolean) => void; // Function to set the dialog state
}

// CommentDialog component
const CommentDialog: React.FC<CommentDialogProps> = ({ open, setOpen }) => {
  const [text, setText] = useState<string>("");
  const { selectedPost, posts } = useSelector((store: any) => store.post);
  const [comment, setComment] = useState<Comment[]>([]);
  const dispatch = useDispatch();
  const axiosPublic=useAxiosPublic()

  useEffect(() => {
    if (selectedPost) {
      setComment(selectedPost.comments);
    }
  }, [selectedPost]);

  const changeEventHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    if (inputText.trim()) {
      setText(inputText);
    } else {
      setText("");
    }
  };

  const sendMessageHandler = async () => {
    try {
      const res = await axiosPublic.post(
        `/post/${selectedPost?._id}/comments`,
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
        const updatedPostData = posts.map((p: any) =>
          p._id === selectedPost._id
            ? { ...p, comments: updatedCommentData }
            : p
        );
        dispatch(setPosts(updatedPostData));
        toast.success(res.data.message);
        setText("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-6xl bg-feed font-itim text-sky-900 flex flex-col">
          <div className="flex flex-1">
            <div className="w-1/2">
              <img
                src={selectedPost?.image}
                alt="post_img"
                className="w-full h-full object-cover rounded-l-lg"
              />
            </div>
            <div className="w-1/2 flex flex-col justify-between">
              <div className="flex items-center justify-between p-4">
                <div className="flex gap-3 items-center">
                  <Link>
                    <Avatar>
                      <AvatarImage src={selectedPost?.author?.profilePicture} />
                      <AvatarFallback>
                        <img
                          className="size-10"
                          src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                          alt="user-male-circle"
                        />
                      </AvatarFallback>
                    </Avatar>
                  </Link>
                  <div>
                    <p className="font-semibold text-base">
                      {selectedPost?.author?.username}
                    </p>
                  </div>
                </div>

                <Dialog>
                  <DialogTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DialogTrigger>
                  <DialogContent className="flex flex-col items-center text-sm text-center bg-feed2">
                    <Button
                      variant="ghost"
                      className="cursor-pointer text-red-500 hover:text-red-500 mt-6 hover:bg-logo w-full"
                    >
                      Unfollow
                    </Button>
                    <Button
                      variant="ghost"
                      className="cursor-pointer mb-2 hover:bg-logo w-full hover:text-sky-900"
                    >
                      Add to favorites
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
              <hr />
              <div className="flex-1 overflow-y-auto max-h-96 p-4">
                {comment.map((comment) => (
                  <Comment key={comment._id.toString()} comment={comment} />
                ))}
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    value={text}
                    onChange={changeEventHandler}
                    placeholder="Add a comment..."
                    // className="w-full outline-none border text-sm border-gray-300 p-2 rounded"
                  />
                  <Button
                    disabled={!text.trim()}
                    onClick={sendMessageHandler}
                    className="group relative z-10 h-10 w-28 overflow-hidden rounded-md bg-sky-700 text-sm text-white"
                  >
                    <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                    <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                    <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                    <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                      Send
                    </span>
                    Send
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CommentDialog;
