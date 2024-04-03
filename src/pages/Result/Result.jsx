import { useParams } from "react-router-dom";
import Button from "../../components/Button/Button";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Result = () => {
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
        <Spinner className={"w-full"} />
      ) : (
        <>
          <h1 className="text-[35px] font-black text-gray-900 md:text-[40px] lg:text-[50px]">
            Poll Result
          </h1>
          <div className="w-full flex items-center justify-center flex-col gap-3">
            <div className="w-full h-auto p-3 rounded-md border-2 border-gray-900 bg-gray-600 text-gray-300 lg:w-1/3 md:w-1/2 flex flex-col gap-3">
              <h2 className="w-full text-md lg:text-xl md:text-lg bg-gray-900 py-2 px-2 rounded-md tracking-wide">
                Voting for Poll-Id:{" "}
                <span className="text-[#0088FF]">{pollId}</span>
              </h2>
              <h2 className="w-full text-md lg:text-md md:text-lg bg-gray-900 py-2 px-2 rounded-md tracking-wide">
                <div>
                  <h2 className="w-full text-md lg:text-xl md:text-lg bg-gray-600 rounded-md tracking-wide py-1.5 px-1.5">
                    Poll Question:{" "}
                    <span className="text-[#0088FF]">{poll?.question}</span>
                  </h2>
                </div>
                <div className="mt-2.5 px-1.5">
                  Poll Created By:{" "}
                  <span className="text-[#0088FF]">{poll?.createdBy}</span>
                </div>
                <div className="px-1.5">
                  Poll Created At:{" "}
                  <span className="text-[#0088FF] text-sm">
                    {poll?.createdAt?.toDate().toLocaleString()}
                  </span>
                </div>
              </h2>
            </div>
            <div className="w-full h-auto p-3 rounded-md border-2 border-gray-900 bg-gray-700 text-gray-300 lg:w-1/3 md:w-1/2">
              <h1 className="w-full text-2xl mb-3 md:text-3xl">Poll Options</h1>
              <div className="flex flex-col items-start justify-start gap-3">
                {poll?.options.map((option, index) => (
                  <h1
                    key={index}
                    className={
                      "py-2 px-5 bg-gray-800 rounded-md hover:bg-white hover:text-gray-900 transition-all duration-200 tracking-wide"
                    }
                    value={option}
                  >
                    {option}
                  </h1>
                ))}
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
