import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { readFileAsDataURL } from "@/lib/utils";
import { toast } from "sonner";
import { setPosts } from "@/redux/postSlice";
import { RootState } from "@/redux/store"; // Adjust the import path as necessary

const CreatePost: React.FC = () => {
  const imageRef = useRef<HTMLInputElement | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string>("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false); // State for dialog visibility
  const { user } = useSelector((store: RootState) => store.auth);
  const { posts } = useSelector((store: RootState) => store.post);
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      const dataUrl = await readFileAsDataURL(selectedFile);
      setImagePreview(dataUrl);
    }
  };

  const createPostHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("caption", caption);
    if (file) formData.append("image", file);
    try {
      setLoading(true);
      const res = await axiosPublic.post("/post/addpost", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setPosts([res.data.post, ...posts]));
        toast.success(res.data.message);
        setIsOpen(false); // Close the dialog after successful post creation
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}> {/* Manage dialog visibility */}
        <DialogTrigger onClick={() => setIsOpen(true)}>Create</DialogTrigger>
        <DialogContent className="bg-wall p-8 rounded-lg">
          <DialogHeader className="text-center font-semibold text-xl text-slate-800">
            Create New Post
          </DialogHeader>
          <div className="flex gap-3 items-center ">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="User Avatar" />
              <AvatarFallback>
                <img
                  className="size-10"
                  src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                  alt="user-male-circle"
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-semibold text-xs text-slate-800">
                {user?.username}
              </h1>
              <span className="text-xs text-slate-600">Bio here...</span>
            </div>
          </div>
          <Textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className="focus-visible:ring-transparent border-none bg-slate-50 text-slate-800"
            placeholder="Write a caption..."
          />
          {imagePreview && (
            <div className="w-full h-64 flex items-center justify-center">
              <img
                src={imagePreview}
                alt="Preview"
                className="object-cover h-full w-full rounded-md"
              />
            </div>
          )}
          <input
            ref={imageRef}
            type="file"
            className="hidden"
            onChange={fileChangeHandler}
          />
          <div className="flex gap-4">
            <Button
              onClick={() => imageRef.current?.click()}
              className="group relative z-10 h-8 w-28 overflow-hidden rounded-md bg-sky-700 text-sm text-white"
            >
              <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                Select Photo
              </span>
              Select Photo
            </Button>
            {imagePreview &&
              (loading ? (
                <Button
                  disabled
                  className="group relative z-10 h-8 w-28 overflow-hidden rounded-md bg-sky-700 text-sm text-white"
                >
                  <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                  <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                  <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                  <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                    Please wait...
                  </span>
                  Please wait...
                </Button>
              ) : (
                <Button
                  onClick={createPostHandler}
                  className="group relative z-10 h-8 w-28 overflow-hidden rounded-md bg-sky-700 text-sm text-white"
                >
                  <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
                  <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
                  <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
                  <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                    Share Now
                  </span>
                  Share Now
                </Button>
              ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreatePost;
