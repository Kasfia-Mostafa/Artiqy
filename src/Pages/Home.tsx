import Feed from "./Feed/Feed";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex-grow">
        <Feed />
      </div>
      {/* RightSidebar */}
    </div>
  );
};

export default Home;
