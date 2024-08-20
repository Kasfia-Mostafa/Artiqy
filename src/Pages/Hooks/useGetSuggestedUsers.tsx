import { setSuggestedUsers } from "@/redux/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAxiosPublic from "./useAxiosPublic";

const useGetSuggestedUsers = () => {
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic()
  useEffect(() => {
    const fetchSuggestedUsers = async () => {
      try {
        const res = await axiosPublic.get(
          "/user/suggested",
          { withCredentials: true }
        );
        if (res.data.success) {
          dispatch(setSuggestedUsers(res.data.users));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSuggestedUsers();
  }, []);
};
export default useGetSuggestedUsers;
