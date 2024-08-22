import { setSuggestedUsers } from "@/redux/authSlice";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useAxiosPublic from "./useAxiosPublic";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      setLoading(true);
      try {
        const res = await axiosPublic.get("/user/suggested", {
          withCredentials: true,
        });

        if (res.data.success) {
          // Sort users by createdAt in descending order (most recent first)
          const sortedUsers = res.data.users.sort(
            (a: { createdAt: string }, b: { createdAt: string }) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
          dispatch(setSuggestedUsers(sortedUsers));
        }
      } catch (error) {
        console.error("Error fetching suggested users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestedUsers();
  }, [dispatch, axiosPublic]);

  return { loading };
};

export default useGetSuggestedUsers;
