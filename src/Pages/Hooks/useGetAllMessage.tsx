import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages, setLoading, setError } from "@/redux/chatSlice";
import { RootState } from "@/redux/store";
import useAxiosPublic from "./useAxiosPublic";
import axios from "axios";

const useGetAllMessage = () => {
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const { selectedUser } = useSelector((store: RootState) => store.auth);

  useEffect(() => {
    const fetchAllMessages = async () => {
      if (!selectedUser?._id) {
        console.error("No selected user ID");
        return; // Exit if no selected user
      }
    
      dispatch(setLoading(true)); // Set loading to true when starting to fetch
    
      try {
        console.log(`Fetching messages for user ID: ${selectedUser._id}`); // Log the user ID
        const response = await axiosPublic.get(`/message/all/${selectedUser._id}`, {
          withCredentials: true,
        });
    
        if (response.data.success) {
          dispatch(setMessages(response.data.messages));
        } else {
          dispatch(setError(response.data.message)); // Set error if response indicates failure
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Error fetching messages:", error.message);
          dispatch(setError("Error fetching messages: " + error.message));
        } else {
          console.error("Unexpected error:", error);
          dispatch(setError("Unexpected error occurred"));
        }
      }
    };
    

    fetchAllMessages();
  }, [selectedUser?._id, dispatch, axiosPublic]); // Dependency on selectedUser._id

  return null;
};

export default useGetAllMessage;
