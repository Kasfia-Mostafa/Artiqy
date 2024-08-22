/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setAuthUser } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import imageCompression from "browser-image-compression";
import { Input } from "@/components/ui/input";
import axios from "axios";

const EditProfile: React.FC = () => {
  const imageRef = useRef<HTMLInputElement>(null);
  const { user } = useSelector((store: RootState) => store.auth);
  const [loading, setLoading] = useState<boolean>(false);
  const [input, setInput] = useState<{
    profilePhoto: File | null;
    bio: string;
    username: string;
  }>({
    profilePhoto: null,
    bio: user?.bio || "",
    username: user?.username || "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();

  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Check file size before compression
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds the maximum limit of 10 MB.");
        return;
      }

      // Compress the image
      try {
        const options = {
          maxSizeMB: 1, // Set max size to 1 MB
          maxWidthOrHeight: 1920, // Resize to this width/height
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);
        setInput({ ...input, profilePhoto: compressedFile });
      } catch (error) {
        toast.error("Image compression failed.");
        console.error("Compression error:", error);
      }
    }
  };

  const editProfileHandler = async () => {
    console.log(input);
    const formData = new FormData();
    formData.append("bio", input.bio);
    formData.append("username", input.username);

    if (input.profilePhoto) {
      formData.append("profilePhoto", input.profilePhoto);
    }

    try {
      setLoading(true);
      const res = await axiosPublic.post("/user/profile/edit", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });

      if (res.data.success) {
        const updatedUserData = {
          ...user!,
          username: res.data.user?.username || user!.username,
          bio: res.data.user?.bio || user?.bio,
          profilePicture: res.data.user?.profilePicture || user?.profilePicture,
        };

        dispatch(setAuthUser(updatedUserData));
        navigate(`/profile/${user?._id}`);
        toast.success(res.data.message);
      }
    } catch (error: unknown) {
      // console.log(error);
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "An error occurred.");
      } else {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex items-center min-h-screen max-w-5xl mx-auto">
      <section className="flex flex-col w-full p-10 gap-6 text-sky-900 bg-feed rounded-lg">
        <h1 className="font-bold text-2xl">Edit Profile</h1>
        <div className="flex items-center justify-between bg-logo rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="post_image" />
              <AvatarFallback>
                <img
                  className="size-10"
                  src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                  alt="user-male-circle"
                />
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="font-bold text-sm">{user?.username}</h1>
              <span className="text-gray-600">
                {user?.bio || "Bio here..."}
              </span>
            </div>
          </div>
          <Input
            ref={imageRef}
            onChange={fileChangeHandler}
            type="file"
            className="hidden"
          />
          <Button
            onClick={() => imageRef?.current?.click()}
            className="group relative z-10 h-8 w-28 overflow-hidden rounded-md bg-sky-700 text-sm text-white"
          >
            <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
            <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
            <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
            <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
              Change photo
            </span>
            Change photo
          </Button>
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Username</h1>
          <Input
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
            name="username"
            placeholder="Enter username"
            className="focus-visible:ring-transparent bg-slate-50"
          />
        </div>
        <div>
          <h1 className="font-bold text-xl mb-2">Bio</h1>
          <Textarea
            value={input.bio}
            onChange={(e) => setInput({ ...input, bio: e.target.value })}
            name="bio"
            placeholder="Write bio here"
            className="focus-visible:ring-transparent bg-slate-50"
          />
        </div>
        <div className="flex justify-end">
          {loading ? (
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
              onClick={editProfileHandler}
              className="group relative z-10 h-8 w-28 overflow-hidden rounded-md bg-sky-700 text-sm text-white"
            >
              <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-white transition-transform duration-700 group-hover:scale-x-100 group-hover:duration-300"></span>
              <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-700 transition-transform duration-500 group-hover:scale-x-100 group-hover:duration-700"></span>
              <span className="absolute -inset-8 origin-left rotate-12 scale-x-0 transform bg-sky-900 transition-transform duration-300 group-hover:scale-x-50 group-hover:duration-500"></span>
              <span className="absolute z-10 text-center text-white opacity-0 duration-100 ease-out group-hover:opacity-100 group-hover:duration-700">
                Save changes
              </span>
              Save changes
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
