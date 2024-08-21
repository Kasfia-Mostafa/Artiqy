import Feed from "./Feed/Feed";
// import useGetAllPost from "./Hooks/useGetAllPost";
// import useGetSuggestedUsers from "./Hooks/useGetSuggestedUsers";
import RightSide from "./RightSide/RightSide";

const Home = () => {
  // useGetAllPost()
  // useGetSuggestedUsers()
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex justify-center items-center">
        <Feed />
      </div>
      <div className="col-span-1 hidden sm:block bg-wall">
        <RightSide/>
      </div>
    </div>
  );
};

export default Home;
