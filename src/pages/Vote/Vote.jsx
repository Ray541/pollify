import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";
import SnackBar from "../../components/SnackBar/SnackBar";

const Vote = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [currentUserVotedOption, setCurrentUserVotedOption] = useState(null);
  const [voted, setVoted] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      const pollRef = doc(firestore, "polls", pollId);
      const pollDoc = await getDoc(pollRef);

      if (pollDoc.exists()) {
        const pollData = pollDoc.data();
        const currentUserData = JSON.parse(
          localStorage.getItem("currentUserData")
        );
        const userId = currentUserData?.uid;

        // Check if the user has already voted in the poll
        const votesQuery = query(
          collection(firestore, "votes"),
          where("pollId", "==", pollId),
          where("userId", "==", userId)
        );

        const votesSnapshot = await getDocs(votesQuery);
        let votedOption = null;

        if (!votesSnapshot.empty) {
          // The user has voted, get the voted option
          votedOption = votesSnapshot.docs[0].data().optionText;
        }

        setPoll({
          id: pollDoc.id,
          ...pollData,
          votedOption,
        });
        setCurrentUserVotedOption(votedOption);
        setLoading(false);
      } else {
        console.log("No Such Poll Created");
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleVoting = async (optionText) => {
    try {
      // Query for "options" collection to find the option with the matching text
      const optionsQuery = query(
        collection(firestore, "options"),
        where("option", "==", optionText)
      );

      const optionsSnapshot = await getDocs(optionsQuery);

      // Check if the option exists
      if (!optionsSnapshot.empty) {
        // Get the option ID from the first document in the snapshot
        const optionId = optionsSnapshot.docs[0].id;

        const currentUserData = JSON.parse(
          localStorage.getItem("currentUserData")
        );

        const userId = currentUserData.uid;
        const userEmail = currentUserData.email;
        const userName = currentUserData.userName;

        // Query for "votes" collection to find the document associated to the user's vote for the current poll
        const votesQuery = query(
          collection(firestore, "votes"),
          where("pollId", "==", pollId),
          where("userId", "==", userId)
        );

        const votesSnapshot = await getDocs(votesQuery);

        // Check if the user has already voted for the current poll
        if (!votesSnapshot.empty) {
          // Get the ID of the first document in the snapshot
          const voteId = votesSnapshot.docs[0].id;

          // Update the document in the "votes" collection with the new option selected by the user
          await setDoc(doc(firestore, "votes", voteId), {
            pollId,
            optionId: optionId,
            optionText: optionText,
            userId,
            userEmail,
            userName,
            voted: true,
          });

          setIsSnackbarVisible(true);
          setTimeout(() => {
            setIsSnackbarVisible(false);
          }, 3000);

          // Update the state to mark the option as voted
          setPoll((prevState) => ({
            ...prevState,
            votedOption: optionText,
          }));

          setCurrentUserVotedOption(optionText);

          // Store the voted option in local storage
          localStorage.setItem(
            `votedOption-${pollId}`,
            JSON.stringify(optionText)
          );
        } else {
          // If the user has not voted for the current poll yet, add a new document to the "votes" collection
          await addDoc(collection(firestore, "votes"), {
            pollId,
            optionId: optionId,
            optionText: optionText,
            userId,
            userEmail,
            userName,
            voted: true,
          });

          setIsSnackbarVisible(true);
          setTimeout(() => {
            setIsSnackbarVisible(false);
          }, 3000);

          // Update the state to mark the option as voted
          setPoll((prevState) => ({
            ...prevState,
            votedOption: optionText,
          }));

          setCurrentUserVotedOption(optionText);

          // Store the voted option in local storage
          localStorage.setItem(
            `votedOption-${pollId}`,
            JSON.stringify(optionText)
          );
        }
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  useEffect(() => {
    const fetchVotes = () => {
      const votesQuery = query(
        collection(firestore, "votes"),
        where("voted", "==", true)
      );

      const unsubscribe = onSnapshot(votesQuery, (snapshot) => {
        snapshot.forEach((change) => {
          setVoted(true);
        });
      });

      return () => unsubscribe();
    };

    fetchVotes();
  }, []);

  return (
    <section className="w-full min-h-[90vh] p-3 flex flex-col items-center justify-center gap-5">
      {isSnackbarVisible && (
        <SnackBar
          className={"absolute bottom-5"}
          value="Voted successfully!"
          onClose={() => setIsSnackbarVisible(false)}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-[35px] font-black text-gray-900 md:text-[40px] lg:text-[50px]">
            Poll Voting
          </h1>
          {poll && (
            <>
              <div className="w-full h-auto px-3.5 py-3.5 border-2 border-gray-900 bg-gray-700 text-gray-300 lg:w-1/3 md:w-1/2 rounded-md flex flex-col gap-2 shadow-md shadow-[#00000093]">
                <div className="w-full text-md lg:text-xl md:text-lg bg-gray-900 py-2 px-2 rounded-md tracking-wide flex flex-col gap-2 lg:gap-3 lg:px-3 lg:py-3">
                  <h2>Voting for Poll-Id : {pollId}</h2>
                  <h1>Poll Question : {poll.question}</h1>
                </div>
                <div className="w-full text-md lg:text-xl md:text-lg bg-gray-900 py-2 px-2 rounded-md tracking-wide flex flex-col gap-1 lg:gap-3 lg:px-3 lg:py-3">
                  <h3>
                    Poll Created At:{" "}
                    {poll?.createdAt?.toDate().toLocaleString()}
                  </h3>
                  <h3>Poll Created By: {poll.createdBy}</h3>
                </div>
                <div className="mt-2">
                  <Link
                    to={`/result/${pollId}`}
                    className={
                      "px-5 py-2 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none"
                    }
                    value={"Poll Results"}
                  >
                    Poll Results
                  </Link>
                </div>
              </div>
              <div className="w-full h-auto px-3.5 py-3.5 border-2 border-gray-900 bg-gray-900 text-gray-300 lg:w-1/3 md:w-1/2 rounded-md shadow-md shadow-[#00000093]">
                <h1 className="w-full text-xl mb-3">
                  Poll Question: {poll.question}
                </h1>
                <div className="flex flex-col items-start justify-start gap-3">
                  {poll.options.map((option, index) => (
                    <div key={index}>
                      {currentUserVotedOption === option && voted === true ? (
                        <p className="px-5 py-2 bg-white text-gray-900 rounded-md hover:bg-white hover:text-gray-600 transition-all duration-200 tracking-wide">
                          Your Vote 👉 {option}
                        </p>
                      ) : (
                        <Button
                          className={
                            "px-5 py-2 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none"
                          }
                          value={option}
                          onClick={() => handleVoting(option)}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
};

export default Vote;

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
