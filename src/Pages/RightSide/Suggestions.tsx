import React from "react";
import { useSelector } from "react-redux";

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

  if (!suggestedUsers) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-10">
      <div className="flex items-center justify-between text-sm">
        <h1 className="font-semibold text-gray-600">Suggested for you</h1>
        <span className="font-medium cursor-pointer">See All</span>
      </div>
      {suggestedUsers.length === 0 ? (
        <div>No suggestions available.</div>
      ) : (
        suggestedUsers.map((user) => (
          <div
            key={user._id}
            className="flex items-center justify-between my-5"
          >
            <div
              key={user._id}
              className="flex justify-between h-16 w-80 bg-feed2 border-slate-300 border- space-y-2 px-4 py-2 rounded-2xl"
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
              <button className="text-md w-20 h-8 bg-teal-600 text-white relative overflow-hidden group z-10 hover:text-white duration-1000 rounded-md hover:cursor-pointer">
                <span className="absolute bg-teal-700 size-36 rounded-full group-hover:scale-100 scale-0 -z-10 -left-2 -top-10 group-hover:duration-500 duration-700 origin-center transform transition-all"></span>
                <span className="absolute bg-teal-900 size-36 -left-2 -top-10 rounded-full group-hover:scale-100 scale-0 -z-10 group-hover:duration-700 duration-500 origin-center transform transition-all"></span>
                Follow
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Suggestions;
