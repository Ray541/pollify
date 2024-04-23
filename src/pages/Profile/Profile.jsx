import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firestore } from "../../firebase/firebase";
import SnackBar from "../../components/SnackBar/SnackBar";

const Profile = () => {
  const [userPrevData, setUserPrevData] = useState({
    fullName: "",
    userName: "",
  });
  const [isSnackbarVisible, setIsSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setLoading(true);
      const currentUserData = JSON.parse(localStorage.getItem("currentUser"));
      const currentUserId = currentUserData.uid;

      const q = query(
        collection(firestore, "users"),
        where("uid", "==", currentUserId)
      );
      onSnapshot(q, (snapshot) => {
        snapshot.docs.forEach((doc) => {
          setUserPrevData(doc.data());
          setLoading(false);
        });
      });
    };

    fetchUserDetails();
  }, []);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const fullName = formData.get("fullName");
    const userName = formData.get("userName");

    try {
      const currentUserData = JSON.parse(
        localStorage.getItem("currentUserData")
      );
      const userEmail = currentUserData.email;

      const q = query(
        collection(firestore, "users"),
        where("email", "==", userEmail)
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (snap) => {
          const documentRef = doc(firestore, "users", snap.id);
          await updateDoc(documentRef, { fullName, userName });
          localStorage.setItem(
            "currentUserData",
            JSON.stringify({ ...currentUserData, fullName, userName })
          );
          setIsSnackbarVisible(true);
          setTimeout(() => {
            setIsSnackbarVisible(false);
          }, 3000);
        });
      } else {
        console.log("No matching documents.");
      }
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  return (
    <section className="w-full min-h-[89vh] flex flex-col items-center justify-center py-3 px-2 gap-10">
      {isSnackbarVisible && (
        <SnackBar
          className={"absolute bottom-5"}
          value="Profile updated successfully!"
          onClose={() => setIsSnackbarVisible(false)}
        />
      )}
      {loading ? (
        <Spinner />
      ) : (
        <>
          <h1 className="text-[#2b00ff] text-5xl md:text-5xl lg:text-6xl font-black tracking-wide">
            User Profile
          </h1>
          <form
            className="border-2 rounded-md border-gray-900 shadow-xl shadow-gray-400 p-3.5 md:p-7 flex flex-col gap-2 w-full md:w-1/2 lg:w-1/3"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label className="text-xl " htmlFor="fullName">
                Full Name
              </label>
              <input
                id="fullName"
                className="tracking-wide text-[17px] w-full p-1 text-gray-900 border-gray-400 mt-1 focus:outline-none border-2 focus:border-2 focus:border-gray-900"
                type="text"
                name="fullName"
                placeholder="Enter Full Name"
                defaultValue={userPrevData.fullName}
              />
            </div>
            <div>
              <label className="text-xl " htmlFor="userName">
                Username
              </label>
              <input
                id="userName"
                className="tracking-wide text-[17px] w-full p-1 text-gray-900 border-gray-400 mt-1 focus:outline-none border-2 focus:border-2 focus:border-gray-900"
                type="text"
                name="userName"
                placeholder="Enter User Name"
                defaultValue={userPrevData.userName}
              />
            </div>
            <label className="text-xl">
              Email: <span className="text-[17px]">{userPrevData.email}</span>
            </label>
            <div className="text-xl w-full">
              <button
                className={`px-5 py-2 w-full cursor-pointer rounded-md bg-[#0088FF] hover:bg-[#2B00FF] text-white text-[17px] transition-all duration-200 focus:bg-[#2B00FF] focus:outline-none mt-3`}
                type="submit"
              >
                Edit Profile
              </button>
            </div>
          </form>
        </>
      )}
    </section>
  );
};

export default Profile;

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
