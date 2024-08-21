import { setMessages } from "@/redux/chatSlice";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Message {
  id: string;
  content: string;
}

const useGetRTM = () => {
  const dispatch = useDispatch();
  const socket = useSelector((store: RootState) => store.socketio.socket);
  const messages = useSelector((store: RootState) => store.chat.messages);

  useEffect(() => {
    if (socket) {
      const handleNewMessage = (newMessage: Message) => {
       
        const isDuplicate = messages.some((msg) => msg.id === newMessage.id);

        if (!isDuplicate) {
          dispatch(setMessages([...messages, newMessage]));
        }
      };

      socket.on("newMessage", handleNewMessage);

      return () => {
        socket.off("newMessage", handleNewMessage); 
      };
    }
  }, [socket, dispatch, messages]);
};

export default useGetRTM;
