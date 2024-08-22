import { TrendData } from "../../Data/TrendData";

const Trends = () => {
  return (
   <div className="flex justify-center mt-20 mb-10 text-sky-900">
     <div className="flex flex-col gap-4 bg-feed2 shadow-md p-14 rounded-2xl w-2/3">
      <h3 className="text-teal-600 text-xl font-extrabold my-4">Trends For You</h3>
      {TrendData.map((Trend) => {
        return (
          <div key={Trend.id} className="flex flex-col gap-4">
            <span className="font-bold">#{Trend.name}</span>
            <span>{Trend.shares} k shares</span>
          </div>
        );
      })}
    </div>
   </div>
  );
};

export default Trends;
