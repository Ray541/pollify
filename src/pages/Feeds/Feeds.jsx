import { useEffect, useState } from "react";
import PollCard from "../../components/PollCard.jsx/PollCard";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const Feeds = () => {
  const [searchPoll, setSearchPoll] = useState("");
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleSearchChange = (e) => {
    setSearchPoll(e.target.value);
  };

  /**Fetch the polls form the firestore
   * @returns all the polls
   */
  useEffect(() => {
    const fetchPolls = async () => {
      const unsubscribe = onSnapshot(
        collection(firestore, "polls"),
        (snapshot) => {
          const pollsData = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setPolls(pollsData);
          setLoading(false);
        }
      );

      // Cleanup function to unsubscribe from the listener when the component unmounts
      return () => unsubscribe();
    };

    fetchPolls();
  }, []);

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
            value={searchPoll}
            onChange={() => handleSearchChange}
          />
        </div>

        <div className="w-full flex items-center justify-center gap-7 flex-wrap p-5">
          {loading ? (
            <Spinner /> // Display spinner component while loading
          ) : (
            polls.map((poll) => <PollCard key={poll.id} poll={poll} />)
          )}

          {/* {polls.map((poll) => (
            <PollCard key={poll.id} poll={poll} />
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default Feeds;

const Spinner = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-3 w-full h-full bg-white">
      <div
        className={`animate-spin rounded-full h-20 w-20 md:h-25 md:w-25 lg:h-32 lg:w-32 border-t-2 border-b-2 border-gray-900`}
      >
        <style>{spinnerStyles}</style>
      </div>
      <h1 className="text-3xl tracking-wider font-bold">Fetching Polls</h1>
    </div>
  );
};

// CSS for Spinner component animation
const spinnerStyles = `
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
`;
