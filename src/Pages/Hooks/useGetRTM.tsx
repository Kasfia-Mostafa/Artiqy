import { setMessages } from "@/redux/chatSlice";
import { RootState } from "@/redux/store";
import { Message } from "@/Types/postType";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetRTM = () => {
  const dispatch = useDispatch();
  const { socket } = useSelector((store: RootState) => store.socketio);
  const messages = useSelector(
    (store: RootState) => store.chat.messages
  ) as Message[];

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage: Message) => {
        dispatch(setMessages([...messages, newMessage]));
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage);
      };
    }
  }, [socket, dispatch, messages]);
};

export default useGetRTM;
