/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, ChangeEvent } from "react";
import { toast } from "sonner";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import {  MoreHorizontal, Send } from "lucide-react";
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
interface BookmarkResponse {
  message: string;
  success: boolean;
  type: string;
}

const Post: React.FC<PostProps> = ({ post }) => {
  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);

  const posts: Post[] = useSelector((state: RootState) => state.post.posts);

  const [text, setText] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(
    post.likes.includes(user?._id || "")
  );
  const [postLike, setPostLike] = useState<number>(post.likes.length);
  const [comment, setComment] = useState<Comment[]>(post.comments);

  const changeEventHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const inputText = e.target.value;
    setText(inputText.trim() ? inputText : "");
  };

  //* Like and dislike post
  const likeOrDislikeHandler = async () => {
    try {
      const action = liked ? "dislike" : "like";
      const res = await axiosPublic.post(
        `/post/${post._id}/${action}`,
        {},
        {
          withCredentials: true,
        }
      );

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
      console.error(error);
      toast.error("An error occurred while liking/disliking the post.");
    }
  };

  //* Comment on post
  const commentHandler = async () => {
    try {
      const res = await axiosPublic.post(
        `/post/${post._id}/comments`,
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

  //* Delete a post
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

  //* Bookmark a post
  const bookmarkHandler = async () => {
    try {
      console.log("Attempting to bookmark post with ID:", post._id);

      const response = await axiosPublic.post<BookmarkResponse>(
        `/post/${post._id}/bookmark`,
        {},
        { withCredentials: true }
      );

      console.log("Bookmark response:", response.data);

      if (response.status === 200 && response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message || "Failed to bookmark the post.");
      }
    } catch (error: any) {
      console.error("Error bookmarking post:", error);

      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        console.error("Response headers:", error.response.headers);
        const message =
          error.response.data.message || "An unexpected error occurred.";
        toast.error(message);
      } else if (error.request) {
        console.error("Request made but no response received:", error.request);
        toast.error("No response received from the server. Please try again.");
      } else {
        console.error("Error setting up the request:", error.message);
        toast.error("Error setting up the request. Please try again.");
      }
    }
  };

  return (
    <div
      className="flex flex-col w-full lg:max-w-3xl gap-4 p-5 my-10 mx-2
     border-slate-50 rounded-md
     bg-[#a5e4df] text-sky-900"
    >
      <div className="flex items-center justify-between w-full">
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
          <div className="flex items-center gap-2">
            <h1 className="text-xl">{post.author?.username}</h1>
            {user?._id === post.author._id && (
              <Badge variant="secondary">
                <span className="pr-1 w-12 lg:w-10 text-sky-900">Author</span>
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
            <MoreHorizontal className="cursor-pointer ml-4" />
          </DialogTrigger>
          <DialogContent className="flex flex-col items-center text-sm text-center bg-feed">
            {post.author._id !== user?._id && (
              <Button
                variant="ghost"
                className="cursor-pointer text-red-500 hover:text-red-500 mt-6 hover:bg-logo w-full"
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
        src={post.image}
        alt="post_img"
      />

      <div className="flex items-center justify-between my-2">
        <div className="flex items-center gap-3">
          {liked ? (
            <img
              onClick={likeOrDislikeHandler}
              className="size-8 cursor-pointer"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFBUlEQVR4nO2Yy27idhSHXalV1UXVbkdtNYRLriQD2NwDBmPA3OyQkAtU6jxCX6HNVO17TLuZdt6hVaVMOlLb/UTqZorNHRs7mkySKqeyCSSADQaSSRb8pLO1vvP57+NjI8gss8wyyyy3HSmztybRhX2JyR9KmTwrZfKnYnqXldJ7B1J6Z/84uW0b95p8hLbzBPOEJ+gDIZxhm6HMKY+nWT6UOuTx1LfNYGJ1anBhY9d0TBeeS0zh4pgpwDGdBykj1x5Iabl2QUrtgJjcgVZi+1eR2sZHghN0WCDo3wSCAYGggQ/LlQE+lAEeTyvVDKagEUxdNAOJn/lAdG4i+OONL2PHdJ7vgLfh9y7hZfAreDGxrVSLyl2I1NbTJrn9yQA4znzKE8xPQkQG78Bn2uChK3ClAsl2rSeg7os36/5YdGx4iSmcj7IuJtvgYiIHIpWDVnxLKSG2+UokN5Y61xMJepknmKNR1pvBK/CGXy4KGr441D2x87pbZxPtY5Pne6ynta3L4CLVBm/FNtsVzUKLzIpCdCMmkExciDCiDN8DPsR64xK84ZUrBnVPFGoussG744bR9unC817ru+rWqV7rbfA2vEBuKMVHmBOeYE70W6euwceg4YlB3R2FupuEuouEGkY80zFt8hfDrec0rQvkJXxELpXjomZ9PaFpXYF3kVB3RqDmJKCKERcNDLcOaSD/RPUhHWo922O99yHtt651XKiu9XqfdQUeI6CGhttlx7/RbiC9+8edWfeoW+/CO0JQtYegagseajYgpnZLw61v6rMemtC6S7Yug/dZV+BxqNpwqKwFWe0GkjunWqNR3TpzQ9bJ3uPSb12BD0L1UQAqa4FTzQZaiVxZl/WIlvX0GNajQ61XHdfBO/DrUF71c9p3IJE7nNg6rmHdfyPWobK6DpVVP5St/gPtOxDf+mHghXQT1r06rDu0rSvwVj9UVnxQWvZ+p90AlfX0WtczGkdZH3whqVvHlYdUzboMX17xQXnZC6Vlj0uzAaUJMvuntvXJ1gBt66EB6wp4n/XyileBLy+5/0JGRSCye/qtqy9fU1u3ytZ9XevlJY9S3IIrN7IBQJD3eIJ+oWv5Wtdh3Tm+9XIHvAO/6JbhX8psiN6vpWY4c6ZqfZo1YALrJRl+3nnOLTgxXfDdJkLp76ddvrRH43Xrfk3rpQW5XFCyYPtjwStHCcff5/Hk7+NZjwy3rjYarX3WF9vWFfB5J3AW7AWg6AfIJKkTqc+a64nSVMtXv3WV0Vi+hL8Cv4Q3Y2x1EX2ATBP574D8XTrp8jWJ9ZLFCawJbRUtzrH/dqg34aHwhid+Mu0aoMu6BQPOjJ5wFnsQucnU3CRdc0XPp1kDeq27B6xzZgxYs+M/bg7bulH4bhNOslBzRs4mXQOuj8ZB6xiwRvSMNdryyG2mioZSNUf4zcTWFwatc2YUOKPjLWt0ZG8VvtuEPRys2PDWxNYtV9Y5EwrsnEMqGu2RdwLfbWI14KisBYrDl68h1k0ocCYHcHOOf4sPH93MtBm7CTTwoGL1vxy2Bgxal8GVIwPsnP3vogn7ArnLHJmpD0vLvqeaa4BiHeu1rsDbnr3+3PMRcl9SWfR8VV50vxlp3WB/yxpsX+veLN9limavnZt3HmlaN9hfFR+u2ZH7nNqC72PWgv7Yd9Zl+F/+MaIDv93vbTgj+lieMKzB9rposD2+a55ZZpllFuRW8j+fN/ZtJnG/2QAAAABJRU5ErkJggg=="
            ></img>
          ) : (
            <img
              onClick={likeOrDislikeHandler}
              className="size-8 cursor-pointer"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACp0lEQVR4nO1ZzWvUUBB/CoLgQbyo+EUVvNnWfRNXkYLeRfGmUr2JCNoqHvSoZ/FSkK7zsq0g6KHgRRG9ePMfEBQWehQ/wG5m4q6o2G3k7ZZ1Idkkm83XQn4wlxDm/X4z817eTIQoUKBAgdwD0NoHimcA6Y1EqgFyUyL9AuTPoOg1IN2erNBYWH9lRftB8R3tDxR9Wfelfdbaz5CvG4v1vUMTL6uVPVLxgkRaBcWOn3Xeoad+C+tASKRnYf1J5OpkZWV3JPKAdBYUN4IWci/MP0omn3P5U3whqj8DrTMDkZdo3QBFrUEX6xrSmlR08z95uqWfRfanqAVozw4Q+SHI94jQmTCQzw9HnrsiAjOhaz5Kmv3Sry1Of6Xq910+0efFuBZL0Ey/EyLwdMjaJNKqrhQPAfZs1uQgrAjF19wC9AcpB+QgXBZeeZ0+yyMkoOaRgfhOnxSs4RIgFds5IOaENPbaAx9Hp4T4g1cJLWVNDMLbklcJTY9MBhRPe33Ito7IRv45Ps/bXAI6Ivh+Dgg6AfZA9MPEfGN7nJev2A25eeRhc2dfAeub+WrmRFVfmxGBcJwNgPw2B2SdXpNI78RdZ2OwACHEUbOxQyJ/yhH5bwM3+WByuT0tyFoA0h9Aa0pEQemRdVoq+pudAGrpljQS+a4I074YS488eOTXpMlXRBzQjX6a5SR1Z4h0ORbyXREmndS3wOQjz01A+5RIAka1fijJ00ki1Q20j4skoWeggPw+AfK1wxX7oEgDJx47m0HRXIxl81xfJkXaMNC+1K7ZyOTptx5jiiwBaI3rDilKyQCSFHkAoLMJkO6FGozpOSkyTjz5ukXkDVLZx9qR7U9+OfK1IM1sdMbzPd2dvs8omstl1H1/IyG/AKSXxgIf6PtigQIFCohRxj/CHWLbcwxFfgAAAABJRU5ErkJggg=="
            ></img>
          )}
          <img
            onClick={() => {
              dispatch(setSelectedPost(post));
              setOpen(true);
            }}
            className="size-8 cursor-pointer"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAADkklEQVR4nO2YyVIaURiFWRsVEBkUFIxDTEyceIlYea5g1AjiFE2cEsVonGKMU6Ju8wgaQ4vSAk4geYI/9Xc3cAWae+1QXVLFX3U2vfrOqXPPojWa4hWveMUrXvGIcx78feU8iJ87D+LQuY+6hY69W+j4eQvtP1AxaNuNQdtODFp3otC6HYXWrSi8QG3ewPPvolo2bqDl2zU8Q61fw9OvV4Ka166gefUKnqxcCmpavoSmpUtoXLqAxi8X0LCIikD9QgTqP0fgMWo+DA5fmLfPhbs0tOvcj/NOATwOnRK4CB+D9l0CHsG3CfBNAnyDBL++C75KgC8T4BK8AL6QAq9D+cLgmAuDfTYUZDEgglNSF8C3ovLg6wT4GoKnp35BTR3B6+YQPgSO2RDYP4WAboCWupK6yKW+mANcSl0Al+BrP57TDdDrcp/UldfFQaSegK+dYTDAVBe51NfkHiljXXzy4DWoaQYDso9Uti73eaSRzNR98nVBJcBt0zzYpni6AeV1EVNvWiHAl1J1aVggUp8Pyz5Se0bqIjjKOsliQIVNz6jLrEzqBLh1IgjVE0G6AbU2HeHtMuDJ1CcJ+A+iqAbyvunzEcV1sUqpI3jVe9QZ3YCam16b5ZEK4JOZ4JbxM7CMMRhQc9NrKHVB8KrxFLz53SmDARU33UapSxJ87FSAN40yGFBz061S6klwMvWxVOrmURHeNBKgG5Dd9Cx1+d9Nt96pSzCjLonUTSOnYBwJgHGYwYCam16dtS5nKfDRFHglaojBgKJHylAX1kdqJlMfluCHAlA5eAKGwRMGAypuuoVSFwF8KCCAG7wnUOFlMJD3TVdQF2Na6gL8AIqjG1Bz082yqWeC6z0c6N0MBtTcdBOlLklwDwc6Nwe6fj/dgJqbbqTUJZG6zu0X4LVvWQyouOmV6XXxpoNzSXBUed8fugHZTZ/J/6Yb0sArPAR8fyp1bZ8IX97LYEDNTTdQ6pJIHcHLUD0MBhRtOnNd6I9U258dvPTNsSCqATU3XU+pC4KX9Yjgpd3H8KibxcD0OZ/XTc9ZFy5nXRKpI/gj128ocR3Rfy1aZ/gu21SQV2PTtcm65EjdJcG/PgqWuI5eavJ1LJteMcAdGocDFs1DPBNl0/UPGR4v16brPf5DY+8DhseTe6QFAY+X7ZHqCgUeL30aCwoej9x0nbvA4PESm64tRHg8vZvb07r9v0q9x0bhQ/E0iu4flGDypKGyTFAAAAAASUVORK5CYII="
          ></img>
          <Send className="cursor-pointer hover:text-gray-600" />
        </div>

        <div>
          <img
            onClick={bookmarkHandler}
            className="size-8 cursor-pointer"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAABUUlEQVR4nO2SsUvDUBCHT6GDIIjwDg0Uoe+KiLh17ZJRFFycu5mMgsFZ/wVX3Ry7+U6d3FwLDk5OgnaQBNzFtpFAKy5B5fUlEe+DG9/v3Y/7AARB+DFxEG3FQdRPwih1MXF48BzvRZvgiuwDV8snkxJB9OSsgOvlk/FIgTzkAmHJCj34O2kRA1IgB7mALwrZIQr5opAdd95aWsSAK6SAJxewQxTyRCE7RCFPFLJDFPJKVoiR0iIGpEAOcgEUhez4VwoZ1H3G5u6Famyzosc/U8Cgfmekky6uz0/edev1OUY6ZtRv1S6g6JaX9Ebe+yvVWGVFN5UrYJBeWen9I4DZ7zJSgBlG6hil49ILGKQRK31+vdzE32ZdLqwsZqox0rDIAoPP5RXdG9Rt20yDup1lfSkwAFcw6jNW9GJQH/agVZtWbg9atSxznH06rVxBEKD6fABihiIvJkUCyQAAAABJRU5ErkJggg=="
          ></img>
        </div>
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
      <div className="flex items-center justify-between gap-2">
        <Input
          type="text"
          placeholder="Add a comment..."
          value={text}
          onChange={changeEventHandler}
          className="text-sm w-full focus-visible:ring-transparent"
        />
        {text && (
          <Button
            onClick={commentHandler}
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
        )}
      </div>
    </div>
  );
};

export default Post;
