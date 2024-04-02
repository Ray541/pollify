import { useEffect, useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";

// @ts-ignore
const PageLayout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        setIsLoggedIn(true);
      } else {
        // User is signed out
        setIsLoggedIn(false);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {isLoggedIn ? <Navbar /> : null}
      <div>{children}</div>
    </div>
  );
};

export default PageLayout;
