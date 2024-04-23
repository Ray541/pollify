import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import { RiDeleteBin5Fill } from "react-icons/ri";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase/firebase";

const deletePollIcon = <RiDeleteBin5Fill />;

const PollCard = ({ poll, onPollDeleted }) => {
  const currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
  const userId = currentUserData.uid;
  const navigate = useNavigate();

  const handleVoteButtonClick = () => {
    navigate(`/vote/${poll.id}`);
  };

  const handleResultButtonClick = () => {
    navigate(`/result/${poll.id}`);
  };

  const handleDeletePoll = async (pollId) => {
    try {
      // Delete the poll itself
      await deleteDoc(doc(firestore, "polls", pollId));

      // Delete options associated with the poll
      const optionsQuery = query(
        collection(firestore, "options"),
        where("pollId", "==", pollId)
      );
      const optionsSnapshot = await getDocs(optionsQuery);
      const deleteOptionsPromises = optionsSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteOptionsPromises);

      // Delete votes associated with the poll
      const votesQuery = query(
        collection(firestore, "votes"),
        where("pollId", "==", pollId)
      );
      const votesSnapshot = await getDocs(votesQuery);
      const deleteVotesPromises = votesSnapshot.docs.map((doc) =>
        deleteDoc(doc.ref)
      );
      await Promise.all(deleteVotesPromises);
      onPollDeleted();
    } catch (error) {
      console.log(error);
      onPollDeleted(error);
    }
  };

  const options = poll.options || [];

  return (
    <div className="bg-gray-600 w-full h-auto p-3 rounded-lg md:w-72 lg:w-1/4 flex flex-col gap-3 shadow-xl hover:scale-[1.025] duration-200 ease-linear">
      <div className="w-full bg-gray-900 p-2 rounded-lg text-gray-100 flex justify-between items-center">
        <p className="text-xl font-semibold tracking-wider md:line-clamp-1">
          {poll.question}
        </p>
        {poll.creatorId == userId && (
          <Button
            value={deletePollIcon}
            className="cursor-pointer text-lg md:text-xl hover:text-red-500 focus:text-red-500 focus:outline-none transition-all duration-150"
            onClick={() => handleDeletePoll(poll.id)}
          />
          // <RiDeleteBin5Fill
          //   className="cursor-pointer hover:text-red-500 transition-all duration-150"
          //   onClick={() => handleDeletePoll(poll.id)}
          // />
        )}
      </div>
      <ul className="w-full text-lg bg-gray-800 rounded-md p-2 tracking-wider text-gray-300 md:line-clamp-3">
        Poll Answers:
        {options.map((option, index) => (
          <li
            key={index}
            className="tracking-wider text-[16px] px-2 text-gray-400"
          >
            {option}
          </li>
        ))}
      </ul>
      <div className="bg-black rounded-md text-gray-200 w-full py-2">
        <span className="px-2 py-1 flex items-center justify-start flex-wrap tracking-wider">
          Username: {poll.createdBy}
        </span>
      </div>
      <div className="flex justify-around items-center sm:justify- md:justify-around lg:justify-around flex-wrap gap-3">
        {/* Redirect to Vote Page of perticular Poll */}
        <Button
          className={
            "px-8 py-2 cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] focus:outline-none transition-all duration-200 text-md tracking-wide ease-linear font-bold"
          }
          value={"Vote"}
          onClick={handleVoteButtonClick}
        />

        {/* Redirect to Result Page of perticular Poll */}
        <Button
          className={
            "px-8 py-2 cursor-pointer rounded-md bg-gray-800 hover:bg-gray-100 text-white hover:text-gray-900 text-[17px] focus:outline-none transition-all duration-200 text-md tracking-wide ease-linear font-bold"
          }
          value={"Result"}
          onClick={handleResultButtonClick}
        />
      </div>
    </div>
  );
};

export default PollCard;
