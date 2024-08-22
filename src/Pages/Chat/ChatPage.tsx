import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "@/redux/authSlice";
import { MessageCircleCode } from "lucide-react";
import { setMessages } from "@/redux/chatSlice";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RootState } from "@/redux/store";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Messages from "./Messages";

const ChatPage = () => {
  const [textMessage, setTextMessage] = useState("");
  const { user, suggestedUsers, selectedUser } = useSelector(
    (store: RootState) => store.auth
  );
  const { onlineUsers, messages } = useSelector(
    (store: RootState) => store.chat
  );
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();

  const sendMessageHandler = async (receiverId: string) => {
    if (!textMessage.trim()) return; // Prevent sending empty messages

    try {
      const res = await axiosPublic.post(
        `/message/send/${receiverId}`,
        { textMessage },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setMessages([...messages, res.data.newMessage]));
        setTextMessage("");
      } else {
        console.error("Failed to send message:", res.data.message);
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  useEffect(() => {
    return () => {
      dispatch(setSelectedUser(null));
    };
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-feed2">
      <section className="w-full md:w-1/4 my-8">
        <div className="flex items-center ml-4 mb-2">
          <Avatar className="w-14 h-14">
            <AvatarImage src={user?.profilePicture} />
            <AvatarFallback>
              <img
                className="size-14"
                src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                alt="user-male-circle"
              />
            </AvatarFallback>
          </Avatar>
          <h1 className="font-bold px-3 text-xl flex">{user?.username}</h1>
        </div>
        <hr className="mb-4 border-gray-300" />
        <div className="overflow-y-auto h-[80vh]">
          {suggestedUsers.map((suggestedUser) => {
            const isOnline = onlineUsers.includes(suggestedUser?._id);
            return (
              <div
                key={suggestedUser?._id} 
                onClick={() => dispatch(setSelectedUser(suggestedUser))}
                className="flex gap-3 items-center p-3 hover:bg-feed cursor-pointer"
              >
                <Avatar className="w-14 h-14">
                  <AvatarImage src={suggestedUser?.profilePicture} />
                  <AvatarFallback>
                    <img
                      className="size-18"
                      src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                      alt="user-male-circle"
                    />
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{suggestedUser?.username}</span>
                  <span
                    className={`text-xs font-bold ${
                      isOnline ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {isOnline ? "online" : "offline"}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>
      {selectedUser ? (
        <section className="flex-1 border-l border-l-gray-300 flex flex-col h-full">
          <div className="flex gap-3 items-center px-3 py-2 border-b border-gray-300 sticky top-0 bg-wall z-10">
            <Avatar>
              <AvatarImage src={selectedUser?.profilePicture} alt="profile" />
              <AvatarFallback>
                <img
                  className="size-18"
                  src="https://img.icons8.com/3d-fluency/94/user-male-circle.png"
                  alt="user-male-circle"
                />
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span>{selectedUser?.username}</span>
            </div>
          </div>
          <Messages selectedUser={selectedUser} />
          <div className="flex items-center p-4 border-t border-t-gray-300">
            <Input
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              type="text"
              className="flex-1 mr-2 focus-visible:ring-transparent bg-slate-50"
              placeholder="Messages..."
            />
            <Button
              className="bg-gradient-to-br from-logo to-feed shadow text-sky-900 text-base"
              onClick={() => sendMessageHandler(selectedUser?._id)}
              disabled={!textMessage.trim()}
            >
              Send
            </Button>
          </div>
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center mx-auto">
          <MessageCircleCode className="w-32 h-32 my-5" />
          <h1 className="text-xl">Select a User</h1>
        </div>
      )}
    </div>
  );
};

export default ChatPage;
