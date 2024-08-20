import { setUserProfile } from "@/redux/authSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAxiosPublic from "./useAxiosPublic";

const useGetUserProfile = (userId: string) => {
  const dispatch = useDispatch();
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const res = await axiosPublic.get(`/user/${userId}/profile`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setUserProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserProfile();
  }, [userId, dispatch, axiosPublic]); 
};

export default useGetUserProfile;
