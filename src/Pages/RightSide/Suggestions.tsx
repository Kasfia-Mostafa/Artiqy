import React from "react";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  username: string;
  bio?: string;
  profilePicture?: string;
}

interface SuggestedUsersState {
  suggestedUsers: User[];
}

const Suggestions: React.FC = () => {
  const { suggestedUsers } = useSelector(
    (store: { auth: SuggestedUsersState }) => store.auth
  );
  const axiosPublic = useAxiosPublic();

  if (!suggestedUsers) {
    return <div>Loading...</div>;
  }

  const handleFollow = async (targetUserId: string) => {
    try {
      const res = await axiosPublic.post(
        `/user/followOrUnfollow/${targetUserId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        toast.success("Successfully followed the user.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to follow the user.");
    }
  };

  return (
    <div className="min-h-screen mx-auto w-2/4 my-20">
      <div>
        <div className="flex items-center justify-between text-sm">
          <h1 className="font-semibold text-xl text-sky-800">
            Suggested for you
          </h1>
        </div>
        {suggestedUsers.length === 0 ? (
          <div>No suggestions available.</div>
        ) : (
          suggestedUsers.map((user) => (
            <Link to={`/profile/${user._id}`} key={user._id}>
            <div
              key={user._id}
              className="flex items-center justify-between my-5"
            >
              <div
                key={user._id}
                className="flex justify-between text-sky-800 h-16 w-full bg-feed2 border-slate-300 border- space-y-2 px-4 py-2 rounded-2xl"
              >
                <div className="flex gap-3">
                  <img
                    className="size-10"
                    src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                    alt="user-male-circle"
                  />
                  <div className="grid grid-row-1 mt-2">
                    <span>{user?.username}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleFollow(user._id)}
                  className="text-md w-20 h-8 bg-teal-600 text-white relative overflow-hidden group z-10 hover:text-white duration-1000 rounded-md hover:cursor-pointer"
                >
                  <span className="absolute bg-teal-700 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                  <span className="absolute bg-teal-900 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                  Follow
                </button>
              </div>
            </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default Suggestions;
