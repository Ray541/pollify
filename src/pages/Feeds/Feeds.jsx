import PollCard from "../../components/PollCard.jsx/PollCard";

const Feeds = () => {
  const handleSearchChange = () => {};

  return (
    <section>
      <div className="max-w-7xl mx-auto flex  items-center justify-center flex-col gap-5 py-5 lg:px-8">
        <div className="w-full flex flex-wrap items-center justify-center gap-2 sticky top-[68px] sm:justify-around lg:justify-between bg-white py-2 lg:py-3 z-10">
          <h1 className="text-3xl md:text-[40px] lg:text-[50px] font-bold text-[#2b00ff] sm:text-[50px]">
            Feeds
          </h1>
          <input
            className="border-2 border-gray-400 rounded-[5px] outline-none px-2 py-1 placeholder:text-gray-400 focus:border-gray-900"
            placeholder="Search Poll Ouestion...       🔍"
            type="text"
            name="feeds-search"
            id="feeds-search"
            onChange={() => handleSearchChange}
          />
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

export default Feeds;
