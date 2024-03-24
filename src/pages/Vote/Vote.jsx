import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";

const Vote = () => {
  const options = ["Yes", "No", "Next Weekend", "Not Sure"];

  const handleVoting = () => {};

  return (
    <section className="w-full min-h-[90vh] p-3 flex flex-col items-center justify-center gap-5">
      <h1 className="text-2xl font-black text-gray-900 md:text-3xl lg:text-4xl">
        Poll Voting
      </h1>
      <div className="w-full h-auto p-3 border-2 border-gray-900 bg-gray-700 text-gray-300 lg:w-1/3 md:w-1/2">
        <h2 className="w-full text-lg">Voting for Poll-Id</h2>
        <h1 className="w-full text-xl">Poll Question</h1>
        <h3 className="w-full text-md">Poll Created At</h3>
        <h3 className="w-full text-md mb-3">Poll Created By</h3>
        <Link
          to={"/result"}
          className={
            "px-14 py-2 w-full cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none"
          }
          value={"Poll Results"}
        >
          Poll Results
        </Link>
      </div>
      <div className="w-full h-auto p-3 border-2 border-gray-900 bg-gray-700 text-gray-300 lg:w-1/3 md:w-1/2">
        <h1 className="w-full text-xl mb-3">Poll Question</h1>
        <div className="flex flex-col items-start justify-start gap-3">
          {options.map((option, index) => (
            <Button
              key={index}
              className={"px-3"}
              value={option}
              onClick={handleVoting}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Vote;
