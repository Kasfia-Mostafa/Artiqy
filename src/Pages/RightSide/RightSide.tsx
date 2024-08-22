import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/redux/store";
import SuggestedUsers from "./SuggestedUsers";
import TrendCard from "./TrendCard";

const RightSide: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.auth);

  return (
    <div className="grid justify-center w-full my-10 text-sky-900">
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-2">
        <Link to={`/profile/${user?._id}`}>
          <Avatar>
            <AvatarImage
              src={user?.profilePicture}
              alt="User's profile picture"
            />
            <AvatarFallback>
              <img
                className="size-10"
                src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                alt="Default user avatar"
              />
            </AvatarFallback>
          </Avatar>
        </Link>
        <div>
          <h1 className="font-semibold text-sm">
            <Link to={`/profile/${user?._id}`}>{user?.username}</Link>
          </h1>
          <span className="text-gray-600 text-sm">
            {user?.bio || "Bio here..."}
          </span>
        </div>
      </div>
      <SuggestedUsers />
    </div>
    <div>
      <TrendCard></TrendCard>
    </div>
  </div>
  
  );
};

export default RightSide;
