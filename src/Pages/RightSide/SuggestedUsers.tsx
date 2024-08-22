import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface User {
  _id: string;
  username: string;
  bio?: string;
  profilePicture?: string;
  createdAt: string;
}

interface SuggestedUsersState {
  suggestedUsers: User[];
}

const SuggestedUsers: React.FC = () => {
  const { suggestedUsers } = useSelector(
    (store: { auth: SuggestedUsersState }) => store.auth
  );

  // console.log("Redux Suggested Users:", suggestedUsers);

  if (!suggestedUsers || suggestedUsers.length === 0) {
    return <div>No suggestions available.</div>;
  }

  return (
    <div className="my-10 bg-feed2 pt-8 pb-4 px-6 shadow rounded-2xl">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-base mb-2">Look who's joined!</h1>

        <Link to="/suggestions">
          <span className="font-medium cursor-pointer">See All</span>
        </Link>
      </div>
      {suggestedUsers.slice(0, 3).map((user) => (
        <Link to={`/profile/${user._id}`} key={user._id}>
          <div className="flex items-center justify-between mt-2">
            <div className="flex justify-between h-16 w-80 bg-feed2 space-y-2 px-4 py-2 rounded-2xl">
              <div className="flex gap-3">
                <Avatar>
                  <AvatarImage src={user.profilePicture} alt="user_avatar" />
                  <AvatarFallback>
                    <img
                      className="size-18"
                      src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                      alt="user-male-circle"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="grid grid-row-1 mt-2">
                  <span>{user.username}</span>
                </div>
              </div>
              <button className="text-md w-20 h-8 bg-teal-600 text-white relative overflow-hidden group z-10 hover:text-white duration-1000 rounded-md hover:cursor-pointer">
                Follow
              </button>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SuggestedUsers;
