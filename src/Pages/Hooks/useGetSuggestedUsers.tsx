/* eslint-disable @typescript-eslint/no-explicit-any */
import { setSuggestedUsers } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAxiosPublic from "./useAxiosPublic";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [suggestedUsers, setSuggestedUsersState] = useState<any[]>([]); 

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axiosPublic.get("/user/suggested", {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSuggestedUsers(res.data.users));
          setSuggestedUsersState(res.data.users); 
        } else {
          setError("Failed to fetch suggested users.");
        }
      } catch (error) {
        console.error("Error fetching suggested users:", error);
        setError("An error occurred while fetching suggested users.");
      } finally {
        setLoading(false); 
      }
    };

    fetchSuggestedUsers();
  }, [dispatch, axiosPublic]);

  return { loading, error, suggestedUsers }; 
};

export default useGetSuggestedUsers;
