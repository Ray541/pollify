import { Link, useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const Vote = () => {
  const { pollId } = useParams();
  const [poll, setPoll] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPoll = async () => {
      const pollRef = doc(firestore, "polls", pollId);
      const pollDoc = await getDoc(pollRef);

      if (pollDoc.exists()) {
        setPoll({ id: pollDoc.id, ...pollDoc.data() });
        setLoading(false);
      } else {
        console.log("No Such Poll Created");
      }
    };

    fetchPoll();
  }, [pollId]);

  const handleVoting = () => {};

  return (
    <section className="w-full min-h-[90vh] p-3 flex flex-col items-center justify-center gap-5">
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-[35px] font-black text-gray-900 md:text-[40px] lg:text-[50px]">
            Poll Voting
          </h1>
          {poll && (
            <>
              <div className="w-full h-auto p-3 border-2 border-gray-900 bg-gray-700 text-gray-300 lg:w-1/3 md:w-1/2 rounded-md flex flex-col gap-2">
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
              <div className="w-full h-auto p-3 border-2 border-gray-900 bg-gray-700 text-gray-300 lg:w-1/3 md:w-1/2 rounded-md">
                <h1 className="w-full text-xl mb-3">
                  Poll Question: {poll.question}
                </h1>
                <div className="flex flex-col items-start justify-start gap-3">
                  {poll.options.map((option, index) => (
                    <Button
                      key={index}
                      className={"px-3"}
                      value={option}
                      onClick={handleVoting}
                    />
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
