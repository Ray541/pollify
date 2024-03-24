import PollCard from "../../components/PollCard.jsx/PollCard";
import Button from "../../components/Button/Button";
import { useState } from "react";

const Home = () => {
  const [searchPoll, setSearchPoll] = useState("");

  const handleSearchChange = (e) => {
    setSearchPoll(e.target.value);
  };

  const handleCreatePole = (e) => {
    e.preventDefault();
    console.log("Poll Created");
  };

  return (
    <section className="w-full">
      <div className="max-w-7xl mx-auto flex items-center justify-center flex-col gap-5 py-5 lg:px-8">
        <div className="w-full flex flex-wrap items-center justify-center gap-2 sticky top-[68px] sm:justify-around lg:justify-between bg-white py-2 lg:py-3 z-10">
          <h1 className="text-3xl md:text-[40px] lg:text-[50px] font-bold text-[#2b00ff]">
            Dashboard
          </h1>
          <input
            className="border-2 border-gray-400 rounded-[5px] outline-none px-2 py-1 placeholder:text-gray-400 focus:border-gray-900"
            placeholder="Search Poll Ouestion...       🔍"
            type="text"
            name="dashboard-search"
            id="dashboard-search"
            value={searchPoll}
            onChange={handleSearchChange}
          />

          <Button value={"Create Poll"} onClick={handleCreatePole} />
        </div>

        <div className="w-full flex items-center justify-center gap-7 flex-wrap p-5">
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
          <PollCard />
        </div>
      </div>
    </section>
  );
};

export default Home;
