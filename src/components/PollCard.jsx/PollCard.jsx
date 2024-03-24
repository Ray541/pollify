import { Link } from "react-router-dom";

const PollCard = () => {
  const pollAnswers = ["yes", "no", "maybe", "next-time"];

  return (
    <div className="bg-gray-600 w-full h-auto p-3 rounded-lg md:w-72 lg:w-1/4 flex flex-col gap-3 shadow-xl hover:scale-[1.025] duration-200">
      <div className="w-full text-xl font-semibold bg-gray-900 p-2 rounded-lg tracking-wide text-gray-100">
        Poll Question
      </div>
      <ul className="w-full text-lg bg-gray-800 rounded-md p-2 tracking-wide text-gray-300">
        Poll Answers:
        {pollAnswers.map((index) => (
          <li
            key={index}
            className="text-[17px] px-2 tracking-wide text-gray-400"
          >
            {index}
          </li>
        ))}
        <li className="tracking-wide w-full bg-black px-2 py-1 rounded-md text-gray-200">
          created By
        </li>
      </ul>
      <div className="flex justify-around items-center sm:justify- md:justify-around lg:justify-around">
        <Link
          to={"/vote"}
          className="px-8 py-1 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 text-lg tracking-wide font-light"
        >
          Vote
        </Link>
        <Link
          to={"/result"}
          className="px-8 py-1 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 text-lg tracking-wide font-light"
        >
          Result
        </Link>
      </div>
    </div>
  );
};

export default PollCard;
