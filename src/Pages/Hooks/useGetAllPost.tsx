/* eslint-disable react-hooks/exhaustive-deps */
import { setPosts } from "@/redux/postSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useAxiosPublic from "./useAxiosPublic";

const useGetAllPost = () => {
  const axiosPublic = useAxiosPublic();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const res = await axiosPublic.get("/post/all", {
          withCredentials: true,
        });
        if (res.data.success) {
          // console.log(res.data.posts);
          dispatch(setPosts(res.data.posts));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllPost();
  }, []);
};
export default useGetAllPost;
