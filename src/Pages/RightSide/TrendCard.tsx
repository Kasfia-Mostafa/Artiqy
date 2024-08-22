import { TrendData } from "../../Data/TrendData";

const TrendCard = () => {
  return (
    <div className="flex flex-col gap-2 bg-feed2 shadow-md p-6 rounded-2xl">
      <h3 className="text-teal-600 font-extrabold my-4">Trends For You</h3>
      {TrendData.map((Trend) => {
        return (
          <div key={Trend.id} className="flex flex-col gap-4">
            <span className="font-bold">#{Trend.name}</span>
            <span>{Trend.shares} k shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
