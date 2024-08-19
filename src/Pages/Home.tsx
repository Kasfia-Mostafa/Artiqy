import Feed from "./Feed/Feed";

const Home = () => {
  return (
    <div className="grid grid-cols-3">
      <div className="col-span-2 flex justify-center items-center">
        <Feed />
      </div>
      <div className="col-span-1 hidden sm:block">
        Post
      </div>
    </div>
  );
};

export default Home;
