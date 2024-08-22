import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store";
import useGetAllMessage from "../Hooks/useGetAllMessage";
import useGetRTM from "../Hooks/useGetRTM";
import { Message, SelectedUser } from "@/Types/postType";

const Messages = ({ selectedUser }: { selectedUser: SelectedUser }) => {
  useGetRTM();
  useGetAllMessage();

  const { messages, loading, error } = useSelector(
    (store: RootState) => store.chat
  );

  const { user } = useSelector((store: RootState) => store.auth);

  return (
    <div className="overflow-y-auto flex-1 p-4 text-sky-900">
      {/* Display user info */}
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-center">
          {/* User avatar and profile link */}
          <Avatar className="h-20 w-20">
            <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
            <AvatarFallback>
              <img src="https://img.icons8.com/3d-fluency/94/user-male-circle.png" alt="default-avatar" />
            </AvatarFallback>
          </Avatar>
          <span>{selectedUser?.username}</span>
          <Link to={`/profile/${selectedUser?._id}`}>
            <Button className="h-8 my-2 bg-logo" variant="secondary">View profile</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-3" aria-live="polite">
        {loading ? (
          <div className="text-center text-sky-900">Loading messages...</div>
        ) : error ? (
          <div className="text-center text-red-500">{error}</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-sky-900">No messages yet.</div>
        ) : (
          messages.map((msg: Message) => (
            <div key={msg._id} className={`flex ${msg.senderId === user?._id ? "justify-end" : "justify-start"}`}>
              <div className={`p-2 rounded-lg max-w-xs break-words ${msg.senderId === user?._id ? "bg-gradient-to-tr from-blue-300 to-green-300 text-sky-900" : "bg-gradient-to-bl from-blue-300 to-green-300 text-sky-900"}`}>
                {msg.message}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Messages;


