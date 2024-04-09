import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { collection, doc, onSnapshot, query, where } from "firebase/firestore";

const Result = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userVote, setUserVote] = useState(null);

  useEffect(() => {
    const fetchPoll = async () => {
      const pollRef = doc(firestore, "polls", pollId);

      // Subscribe to real-time updates on the poll document
      const unsubscribe = onSnapshot(pollRef, (doc) => {
        if (doc.exists()) {
          setPoll({ id: doc.id, ...doc.data() });
          setLoading(false);
        } else {
          console.log("No Such Poll Created");
        }
      });

      // Cleanup function to unsubscribe from real-time updates when the component unmounts
      return () => unsubscribe();
    };

    fetchPoll();
  }, [pollId]);

  useEffect(() => {
    const fetchUserVote = async () => {
      const currentUserData = JSON.parse(
        localStorage.getItem("currentUserData")
      );
      const userId = currentUserData?.uid;

      const votesQuery = query(
        collection(firestore, "votes"),
        where("pollId", "==", pollId),
        where("userId", "==", userId)
      );

      const unsubscribe = onSnapshot(votesQuery, (snapshot) => {
        if (!snapshot.empty) {
          const userVote = snapshot.docs[0].data().optionText;
          setPoll((prevState) => ({
            ...prevState,
            userVote,
          }));
          setUserVote(userVote);
        }
      });

      return () => unsubscribe();
    };

    fetchUserVote();
  }, [pollId]);

  /**Function to count votes for each option
   * @returns count of votes every poll option has
   */
  const fetchVoteCounts = async () => {
    // Map to keep track of listeners
    const listeners = new Map();

    // Function to set up a listener for a specific option
    const setupListener = (option) => {
      const votesQuery = query(
        collection(firestore, "votes"),
        where("pollId", "==", pollId),
        where("optionText", "==", option)
      );

      const unsubscribe = onSnapshot(votesQuery, (snapshot) => {
        const voteCount = snapshot.size;
        setPoll((prevState) => ({
          ...prevState,
          voteCounts: {
            ...prevState.voteCounts,
            [option]: voteCount,
          },
        }));
      });

      // Store the unsubscribe function in the map
      listeners.set(option, unsubscribe);
    };

    // Set up listeners for all options
    for (const option of poll?.options || []) {
      setupListener(option);
    }

    // Cleanup function to unsubscribe from all listeners
    return () => {
      listeners.forEach((unsubscribe) => unsubscribe());
    };
  };

  useEffect(() => {
    if (!loading && poll) {
      fetchVoteCounts();
    }
  }, [loading, poll]);

  return (
    <section className="w-full min-h-[90vh] p-3 flex flex-col items-center justify-center gap-5">
      {loading ? (
        <Spinner className={"w-full"} />
      ) : (
        <>
          <h1 className="text-[35px] font-black text-gray-900 md:text-[40px] lg:text-[50px]">
            Poll Result
          </h1>
          <div className="h-auto flex flex-col flex-wrap items-center justify-center md:flex-row lg:flex-row gap-5">
            <div className="flex items-center flex-wrap justify-center flex-col gap-5 lg:gap-5">
              <div className="shadow-md shadow-[#00000093] w-full md:w-full lg:w-full text-md lg:text-md md:text-lg bg-gray-600 py-2 px-2 rounded-md tracking-wide border-2 border-gray-900 lg:p-5 flex flex-col gap-1">
                <div className="bg-gray-900 w-full text-md lg:text-xl md:text-lg rounded-md tracking-wide py-1.5 px-1.5">
                  <h2 className="text-[white] font-bold">
                    Poll Question:
                    <span className="text-[#0088FF] text-[17px]">
                      {poll?.question}
                    </span>
                  </h2>
                </div>
                <div className="mt-2.5 px-1.5 text-[silver] font-bold">
                  Poll Created By:{" "}
                  <span className="text-[#0088FF] font-normal">
                    {poll?.createdBy}
                  </span>
                </div>
                <div className="mb-3 px-1.5 text-[silver] font-bold">
                  Poll Created At:{" "}
                  <span className="text-[#0088FF] font-normal text-sm">
                    {poll?.createdAt?.toDate().toLocaleString()}
                  </span>
                </div>
                <div>
                  <Link
                    to={`/vote/${pollId}`}
                    className={
                      "px-5 py-2 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none"
                    }
                    value={"Poll Results"}
                  >
                    Poll Voting
                  </Link>
                </div>
              </div>
              <div className="shadow-md shadow-[#00000093] w-full md:w-full lg:w-full text-md lg:text-md md:text-lg bg-gray-900 py-2 px-2 rounded-md tracking-wide border-2 border-gray-900 lg:p-5 text-white">
                <h1 className="w-full text-2xl mb-3 md:text-2xl bg-gray-600 rounded-md p-1.5">
                  Poll Options
                </h1>
                <div className="flex flex-col items-start justify-start gap-3">
                  {poll?.options.map((option, index) => (
                    <h1
                      key={index}
                      className={`py-2 px-5 ${
                        userVote === option
                          ? "bg-white text-gray-900"
                          : "bg-gray-600"
                      } rounded-md hover:bg-white hover:text-gray-600 transition-all duration-200 tracking-wide`}
                      value={option}
                    >
                      {userVote === option && "Your Vote 👉 "}
                      {option}
                    </h1>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex items-center flex-wrap justify-center flex-col gap-5 lg:gap-5">
              <div className="shadow-md shadow-[#00000093] w-full md:w-full lg:w-full text-md lg:text-md md:text-lg bg-gray-900 py-2 px-2 rounded-md tracking-wide border-2 border-gray-900 lg:p-5 text-white">
                <h1 className="w-full text-2xl mb-3 md:text-2xl bg-gray-600 rounded-md p-1.5">
                  Total Votes
                </h1>
                <div className="flex flex-col items-start justify-start gap-3">
                  {poll?.options.map((option, index) => (
                    <h1
                      key={index}
                      className={`py-2 px-5 rounded-md hover:bg-white hover:text-gray-600 transition-all duration-200 tracking-wide ${
                        userVote === option && "bg-white text-gray-900"
                      }`}
                      value={option}
                    >
                      {userVote === option && "Your Vote 👉 "}
                      {option} [{poll.voteCounts?.[option] || 0}]
                    </h1>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default Result;

const Spinner = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-3 w-full h-full bg-white">
      <div
        className={`animate-spin rounded-full h-20 w-20 md:h-20 md:w-20 lg:h-30 lg:w-30 border-t-2 border-b-2 border-gray-900`}
      >
        <style>{spinnerStyles}</style>
      </div>
      <h1 className="text-2xl tracking-wider font-bold">
        Fetching Polls Details
      </h1>
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
